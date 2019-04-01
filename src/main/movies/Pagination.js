import React from "react";
import "./Movies.css";

import Button from "../navigation/Button";

const Pagination = ({
                        page,
                        totalPages,
                        onPageIncrease,
                        onPageDecrease
                    }) => (

    <div className="pagination">
        <Button onClick={onPageDecrease}>Previous</Button>
        <span>{`${page}/${totalPages}`}</span>
        <Button onClick={onPageIncrease}>Next</Button>
    </div>
)


export default Pagination