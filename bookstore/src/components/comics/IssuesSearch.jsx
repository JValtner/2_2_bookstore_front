import React, { useState, useEffect } from "react";
import { getAllIssues } from "../../service/comics.service";
import Pagination from "../Pagination";
import Spinner from "../layout/Spiner";
import LocalIssueForm from "./LocalIssueForm";
import { Link } from "react-router-dom";
import "../../styles/style.scss";

const IssuesSearch = () => {
    const volumeIdFromQuery = new URLSearchParams(window.location.search).get("volume");
    const [sort, setSort] = useState("asc");
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [totalItems, setTotalItems] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const [pageCount, setPageCount] = useState(0);



    // Load issues whenever filter, sort, page, or pageSize changes
    useEffect(() => {
        const loadIssues = async () => {
            if (location.state?.message) {
                setFeedbackMsg(location.state.message);
                setTimeout(() => setFeedbackMsg(""), 3000);
            }
            try {
                setLoading(true);

                // ensure correct format
                const formattedFilter = volumeIdFromQuery?.startsWith("4050-")
                    ? volumeIdFromQuery
                    : `4050-${volumeIdFromQuery}`;

                const data = await getAllIssues(formattedFilter, sort, page, pageSize);

                setIssues(data.items || []);
                setTotalItems(data.count || data.length);
                setPageCount(data.totalPages || 1);
                setHasPreviousPage(data.hasPreviousPage || false);
                setHasNextPage(data.hasNextPage || false);
            } catch (error) {
                setErrorMsg(`Greška pri učitavanju izdanja: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        if (volumeIdFromQuery) loadIssues();
    }, [volumeIdFromQuery, sort, page, pageSize]);



    return (
        <div>
            <h1>Pretraga Izdanja</h1>

            {/* Search Form */}
            <form>
                Displaying issues for volume ID: {volumeIdFromQuery}
                <br />

                <label htmlFor="sort">Sort:</label>
                <select
                    id="sort"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="" disabled>--Asc/Desc--</option>
                    <option value="asc">Asc</option>
                    <option value="desc">Desc</option>
                </select>
            </form>

            {loading && <Spinner />}
            {!loading && errorMsg && <p className="message-box error">{errorMsg}</p>}

            {/* Results Table */}

            {
                issues.length > 0 && (
                    <table className="table comics">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Naziv</th>
                                <th>Tom</th>
                                <th>Kratak Opis</th>
                                <th>Opis</th>
                                <th>Broj primeraka</th>
                                <th>Slika</th>
                                <th>Detalji</th>
                                <th>Dodano</th>
                                <th>Zadnje ažurirano</th>
                                <th>Lokalna kopija</th>
                            </tr>
                        </thead>
                        <tbody>
                            {issues.map((issu) => (
                                <tr key={issu.id}>
                                    <td>{issu.id}</td>
                                    <td>{issu.name}</td>
                                    <td>{issu.volume?.name || "N/A"}</td>
                                    <td dangerouslySetInnerHTML={{ __html: issu.deck }} />
                                    <td dangerouslySetInnerHTML={{ __html: issu.description }} />
                                    <td>{issu.number_of_issues}</td>
                                    <td>
                                        {issu.image?.medium_url ? (
                                            <img
                                                src={issu.image.medium_url}
                                                alt={issu.name}
                                                style={{ width: "80px" }}
                                            />
                                        ) : (
                                            "N/A"
                                        )}
                                    </td>
                                    <td>
                                        <a href={issu.site_detail_url} target="_blank" rel="noreferrer">
                                            Detaljnije...
                                        </a>
                                    </td>
                                    <td>{issu.date_added}</td>
                                    <td>{issu.date_last_updated}</td>
                                    <td>
                                        <Link
                                            to="/comics/local-issue-form"
                                            state={{ issue: issu }}
                                        >
                                            Dodaj lokalno
                                        </Link>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                        <Pagination
                            page={page}
                            pageCount={pageCount}
                            totalCount={totalItems}
                            hasPreviousPage={hasPreviousPage}
                            hasNextPage={hasNextPage}
                            pageSize={pageSize}
                            onPageChange={setPage}
                            onPageSizeChange={setPageSize}
                        />
                    </table>
                )
            }

            {issues.length === 0 && !loading && <p>Nema rezultata.</p>}
        </div >
    );
};

export default IssuesSearch;