import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => (
  <header>
    <ul className={styles.navList}>
      <li>
        <Link to="/">Movies</Link>
      </li>
      <li>
        <Link to="/tv">TV</Link>
      </li>
      <li>
        <Link to="/search">Search</Link>
      </li>
    </ul>
  </header>
);

export default Header;
