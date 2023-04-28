import { FC, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../redux/store";
import { useParams, useLocation, Link } from "react-router-dom";
import { listItem, getLists } from "../redux/myListsSlice";
import { getBook } from "../redux/searchSlice";
import styles from "./css/bookDetails.module.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used
import { AddToList } from "./addToList";

export const BookDetails: FC = (props) => {
  const param = useParams();
  const bookID = param.bookID;
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getLists());
    dispatch(getBook(bookID));
  }, []);



  const myLists = useAppSelector((state) => state.myLists.lists);
  const book = useAppSelector((state) => state.search.book);

  const location = useLocation;
  const [toggleDisplay, setToggle] = useState(false);
  const auth = useAppSelector((state) => state.auth.token);

  const displayOnSearch = () => {
    if (!book || Object.entries(book).length === 0) {
      return <div>loading</div>;
    } else {
      const imgLink = book.volumeInfo.imageLinks.thumbnail;
      const title = book.volumeInfo.title;
      const subtitle = book.volumeInfo.subtitle;
      const publisher = book.volumeInfo.publisher;
      const publishedDate = book.volumeInfo.publishedDate;
      const description = book.volumeInfo.description;

      return (
        <div className="p-20 grid">
          
          <div><h2 className="p-5 text-xl text-bold text-center">{title}</h2></div>
          <div><h3 className="p-4 text-l text-bold text-center">{subtitle}</h3></div>
          <img
            src={imgLink ? imgLink : undefined}
            alt={book.volumeInfo.title}
            className="max-w-xl max-h-xl m-auto"
          />

          <h3 className="text-center">
            Author:{" "}
            {book.volumeInfo.authors
              ? book.volumeInfo.authors.map((elem) => {
                  return (
                    <div>
                      <p>{elem}</p>
                      <br></br>
                    </div>
                  );
                })
              : ""}
          </h3>
          <h4 className="text-center">Publisher: {publisher} </h4>
          <h4 className="text-center">Published on: {publishedDate}</h4>
          <p  className="text-center">Description: <div dangerouslySetInnerHTML={{ __html: description }} ></div></p>
        </div>
      );
    }
  };

  const displayFromLists = () => {
    const allBookInList: listItem[] = [];
    myLists.map((listObject) =>
      listObject.list.map((book) => allBookInList.push(book))
    );
    if (myLists.length !== 0) {
      const bookOfInterest = allBookInList.filter(
        (book) => book.ID === bookID
      )[0];

      if (!bookOfInterest) {
        return <div>Cannot find this book</div>;
      }

      const imgLink = bookOfInterest.image;
      const title = bookOfInterest.title;
      const subtitle = bookOfInterest.subtitle;

      const author = bookOfInterest.authors;
      const publisher = bookOfInterest.publisher;
      const publishedDate = bookOfInterest.publishedTime;
      const description = bookOfInterest.description;

      const dropDownOfLists = () => {
        if (auth === null || auth === "") {
          return (
            <div>
              Please <Link to="/signup">sign up</Link> to see your lists
            </div>
          );
        } else {
          return <AddToList myLists={myLists} />;
        }
      };

      return (
        <div className={styles.detailsMain}>
          <div
            onMouseEnter={() => {
              setToggle(!toggleDisplay);
            }}
          >
            Add To Your List
            <FontAwesomeIcon icon={solid("plus")} />
            <div className={styles.AddToList}>
              {toggleDisplay ? dropDownOfLists() : ""}
            </div>
          </div>
          <h2>{title}</h2>
          <h3>{subtitle}</h3>
          <img
            src={imgLink ? imgLink.thumbnail : undefined}
            alt={bookOfInterest.title}
          />
          <h3>Author: {author}</h3>
          <h4>Publisher: {publisher} </h4>
          <h4>Published on: {publishedDate}</h4>
          <p className={styles.description}>Description: {description}</p>
        </div>
      );
    } else {
      return <div>Loading book details</div>;
    }
  };

  return (
    <div>
      <div>{param.fromSearch === ":fromSearch" ? displayOnSearch() : null}</div>
      <div>{param.fromSearch === ":fromList" ? displayFromLists() : null}</div>
    </div>
  );
};
