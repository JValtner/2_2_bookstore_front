import React, { useState, useEffect } from "react";
import { getAllVolumes } from "../../service/comics.service";
import Pagination from "../Pagination";
import Spinner from "../layout/Spiner";
import "../../styles/style.scss";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

const VolumesSearch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("asc");
  const [volumes, setVolumes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [pageCount, setPageCount] = useState(0);



  // Load volumes whenever filter, sort, page, or pageSize changes
  useEffect(() => {
    const loadVolumes = async () => {
      try {
        setLoading(true);
        const data = await getAllVolumes(filter, sort, page, pageSize);
        setVolumes(data.items || []);
        setTotalItems(data.count || data.length);
        setPageCount(data.totalPages || 1);
        setHasPreviousPage(data.hasPreviousPage || false);
        setHasNextPage(data.hasNextPage || false);

      } catch (error) {
        setErrorMsg(`Greška pri učitavanju tomova: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    loadVolumes();
  }, [filter, sort, page, pageSize]);


  return (
    <div>
      <h1>Pretraga tomova</h1>

      {/* Search Form */}
      <form>
        <label htmlFor="filter">Naziv:</label>
        <input
          id="filter"
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Unesite naziv..."
        />

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
        volumes.length > 0 && (
          <table className="table comics">
            <thead>
              <tr>
                <th>ID</th>
                <th>Naziv</th>
                <th>Opis</th>
                <th>Slika</th>
                <th>Detalji</th>
                <th>Izdanja</th>
                <th>Dodano</th>
                <th>Zadnje ažurirano</th>
              </tr>
            </thead>
            <tbody>
              {volumes.map((vol) => (
                <tr key={vol.id}>
                  <td>{vol.id}</td>
                  <td>{vol.name}</td>
                  <td dangerouslySetInnerHTML={{ __html: vol.deck }} />
                  <td>
                    {vol.image?.medium_url ? (
                      <img
                        src={vol.image.medium_url}
                        alt={vol.name}
                        style={{ width: "80px" }}
                      />
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td>
                    <Link to ={vol.site_detail_url} target="_blank" rel="noreferrer">
                      Detaljnije...
                    </Link> 
                  </td>
                  <td>
                    <Link to ={`/comics/issues-search?volume=${vol.id}`}>
                      Sva izdanja...
                    </Link>
                  </td>
                  <td>{vol.date_added}</td>
                  <td>{vol.date_last_updated}</td>
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

      {volumes.length === 0 && !loading && <p>Nema rezultata.</p>}
    </div >
  );
};

export default VolumesSearch;