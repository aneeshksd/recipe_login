import "./RecipeDashboard.css";
import RecipeList from "../recipeList.json";
import "bootstrap/dist/css/bootstrap.css";
import { React, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Card from "react-bootstrap/Card";
import RecipeDetails from "./RecipeDetails";
import { Container } from "react-bootstrap";
import { BiAddToQueue } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import ReactTimeAgo from "react-time-ago";
import { useHistory } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useEffect } from "react";

export default function RecipeDashboard() {
  const [searchInput, setSearchInput] = useState("");
  const [recipeFlag, setRecipeFlag] = useState(true);
  const [recipeSearch, setRecipeSearch] = useState([
    ...RecipeList.data.recipeList,
  ]);
  const [recipe, setRecipe] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [dark, setDark] = useState();
  const [activatedFilter, setActivatedFilter] = useState([]);
  const [activatedStatus, setActivatedStatus] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageVisited, setPageVisited] = useState(0);
  const history = useHistory();
  const perPage = 10;
  const [pageCount, setPageCount] = useState(0);
  // const [developmentFilter, setDevelopmentFilter] = useState(0);
  // const [stagedFilter, setStagedFilter] = useState(0);
  // const [archiveFilter, setArchiveFilter] = useState(0);
  // const [effectiveFilter, setEffectiveFilter] = useState(0);

  useEffect(() => {
    setPageCount(Math.ceil(recipeSearch.length / perPage));
  }, [recipeSearch]);

  useEffect(() => {
    setPageVisited(pageNumber * perPage);
  }, [pageNumber]);

  useEffect(() => {
    console.log("startDate:", startDate);
    console.log("endDate:", endDate);
  }, [startDate, endDate]);

  useEffect(() => {
    recipeListSearch();
  }, [searchInput, activatedStatus]);

  const handleChange = (e) => {
    let searchValue = e.target.value;
    setSearchInput(searchValue);
  };

  const recipeListSearch = () => {
    try {
      let recipies = [...RecipeList.data.recipeList];
      console.log(recipies);
      if (activatedStatus.length > 0) {
        recipies = recipies.filter((item) => {
          return activatedStatus.indexOf(item.status) > -1 ? true : false;
          
        });
        console.log(recipies);
      }
      if (searchInput) {
        recipies = arraySearch([...recipies], searchInput);
      }
      setRecipeSearch([...recipies]);
      setPageNumber(0);
    } catch (error) {
      console.log(error);
    }
  };
  const arraySearch = (array, keyword) => {
    const searchTerm = keyword.toLowerCase();

    return array.filter((item) => {
      return (
        item.name.toLowerCase().match(new RegExp(searchTerm, "g")) ||
        item.status.toLowerCase().match(new RegExp(searchTerm, "g"))
        // item.lastModified.toLowerCase().match(new RegExp(searchTerm, "g"))
      ) ? true : false ;
    });
  };

  const handleFilter = (status) => {
    if (!activatedStatus.includes(status)) {
      activatedStatus.push(status);
    } else {
      activatedStatus.splice(activatedStatus.indexOf(status), 1);
    }
    console.log(activatedStatus);
    setActivatedStatus([...activatedStatus]); //setting array
  };

  const onClickLogOut = () => {
    history.goBack();
  };

  const onArrowClick = () => {
    setRecipeFlag(true);
  };

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const onChangeStartDate = (date) => {
    if (date > endDate) {
      setEndDate(date);
    }
  };

  return (
    <div className="recipe-background">
      <Container fluid>
        <div className="row">
          <div className="col-md-2">
            <div
              class="offcanvas offcanvas-start style-sidebar"
              tabindex="-1"
              id="offcanvas"
              aria-labelledby="offcanvasLabel"
            >
              <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasLabel">
                  <div className="sidebar-icon">
                    <span className="sidebar-icon-position">
                      <FaUserAlt size="30%" />
                    </span>
                  </div>
                </h5>
              </div>
              <div>
                <div className="sidebar-content ">
                  <h3 className={dark === "build" ? "dark" : ""}>
                    {" "}
                    <BiAddToQueue />
                    <span
                      className="sidebar-content-align"
                      onClick={() => setDark("build")}
                    >
                      {RecipeList.data.process_1}
                    </span>
                  </h3>
                </div>
                <div className="sidebar-content">
                  <h3 className={dark === "Execute" ? "dark" : ""}>
                    {" "}
                    <BiAddToQueue />
                    <span
                      className="sidebar-content-align"
                      onClick={() => setDark("Execute")}
                    >
                      {RecipeList.data.process_2}
                    </span>
                  </h3>
                </div>
                <div className="logout-position">
                  <button className="logout-button" onClick={onClickLogOut}>
                    {RecipeList.data.process_3}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-10">
            {recipeFlag && (
              <>
                <div className="row">
                  <div className="col-sm-6">
                    <h2 className="recipe-name">
                      <span className="recipe-name-align">Recipes</span>
                    </h2>
                  </div>
                  <div className="col-sm-6">
                    <button type="button" className="add-recipe-button">
                      + Add Recipe
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-4">
                    <div className="row">
                      <input
                        className="search-bar"
                        placeholder="Search here"
                        onChange={handleChange}
                      />
                    </div>
                    <h5 className="status-align">Status</h5>
                    <div className="button-allign">
                      <div className="row" style={{ marginBottom: "20px" }}>
                        <button
                          className={
                            "development-button " +
                            (activatedStatus?.indexOf("Development") > -1
                              ? "development"
                              : "")
                          }
                          onClick={() => handleFilter("Development")}
                        >
                          {RecipeList.data.Button_1}
                        </button>
                        <button 
                          className={
                            "staged-buttons " +
                            (activatedStatus?.indexOf("Staged") > -1
                              ? "staged"
                              : "")
                          }
                          onClick={() => handleFilter("Staged")}
                        >
                          {RecipeList.data.Button_2}
                        </button>
                        <br></br>
                      </div>
                      <div className="row">
                        <button
                          className={
                            "Archived-button " +
                            (activatedStatus?.indexOf("Archived") > -1
                              ? " Archived"
                              : "")
                          }
                          onClick={() => handleFilter("Archived")}
                        >
                          {RecipeList.data.Button_3}
                        </button>
                        <button
                          className={
                            "ml-3 Effective-button " +
                            (activatedStatus?.indexOf("Effective") > -1
                              ? " Effective"
                              : "")
                          }
                          onClick={() => handleFilter("Effective")}
                        >
                          {RecipeList.data.Button_4}
                        </button>
                      </div>
                    </div>
                    <div className="row ">
                      <h5 className="last-modified-align">Last Modified</h5>
                      <div className="date-picker-align">
                        <div className="col-xs-5">
                          <DatePicker
                            className=" Date-picker"
                            selected={startDate}
                            onChange={(date) => {
                              setStartDate(date);
                              onChangeStartDate(date);
                            }}
                            selectsStart
                            startDate={startDate}
                            endDate={startDate}
                          />
                        </div>
                        <div className="col-md-2">
                          <DatePicker
                            className=" Date-picker"
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-7">
                    <div className="row">
                      {" "}
                      <div className="card-heading">
                        <div className="col-md-4 ">
                          <p className="card-heading-name">Name</p>
                        </div>
                        <div className="col-sm-4 ">
                          <p className="card-heading-last-modified">
                            Last modified
                          </p>
                        </div>
                        <div className="col-sm-4 ">
                          <p className="card-heading-status">Status</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      {recipeSearch &&
                        recipeSearch
                          .slice(pageVisited, pageVisited + perPage)
                          .map((value) => {
                            return (
                              <Card>
                                <Card.Body
                                  onClick={() => {
                                    setRecipeFlag(false);
                                    setRecipe(value);
                                  }}
                                >
                                  <div className="card-text-align">
                                    <div className="row">
                                      <div className="col-md-5 recipe-value-name">
                                        {value.name}
                                      </div>
                                      <div className="col-md-4 time-font-style">
                                        <ReactTimeAgo
                                          date={value.lastModified}
                                          locale="en-US"
                                        />
                                      </div>
                                      <div className="col-md-3">
                                        <button
                                          className="  btn btn-sm rounded"
                                          style={{
                                            height: "30px",
                                            backgroundColor: value.color,
                                            color: value.fontColor,
                                            fontWeight: "bold",
                                            maxWidth: "120px",
                                            borderRadius: "50px",
                                            width: "500px",
                                          }}
                                        >
                                          {value.status}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </Card.Body>
                              </Card>
                            );
                          })}
                    </div>
                    <ReactPaginate
                      previousLabel={"<"}
                      nextLabel={">"}
                      pageCount={pageCount}
                      onPageChange={changePage}
                      containerClassName={"paginationBttns"}
                      previousLinkClassName={"previousBttn"}
                      nextLinkClassName={"nextBttn"}
                      disabledClassName={"paginationDisabled"}
                      activeClassName={"paginationActive"}
                    />
                  </div>
                </div>
              </>
            )}
            { !recipeFlag && (
              <RecipeDetails name={recipe} clickArrow={onArrowClick} />
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
