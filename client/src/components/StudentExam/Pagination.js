import React from 'react';

const Pagination = ({  totalQuestions, currentPage,paginate }) => {
  const pageNumbers = [];
  
  
  for (let i = 1; i <= totalQuestions; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="center-pagination">
        <div className="pagination">
         {pageNumbers.map(number => (
            <a 
            key={number}
            className={number===currentPage?"active":null}
            onClick={() => paginate(number)} 
            title={`Question ${number}`} 
            >
              {number}
            </a>
        ))}
        </div>
    </div>
  );
};

export default Pagination;
