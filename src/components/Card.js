import React from 'react';

export default function Card(props) {
  const arr = [1, 2, 3, 4, 5, 6];

  // Extracting options from props
  let piecesOptions = Object.keys(props.options);

  return (
    <div className="d-flex justify-content-center">
      <div
        className="card m-3 shadow"
        style={{
          width: '15rem',
          minHeight: '24rem', // Ensures all cards have enough space for the button
          borderRadius: '15px',
          overflow: 'hidden',
          transition: 'transform 0.3s, box-shadow 0.3s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
        }}
      >
        <img
          style={{
            height: '150px',
            objectFit: 'cover',
            borderTopLeftRadius: '15px',
            borderTopRightRadius: '15px',
          }}
          src={props.foodImg}
          className="card-img-top"
          alt={props.foodName}
        />
        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            <h5 className="card-title text-center">{props.foodName}</h5>
            <p className="card-text text-center text-muted">Delicious and freshly prepared for you!</p>
          </div>
          <div>
            <div className="container">
              {/* Dropdown for quantity */}
              <select
                className="form-select mb-2"
                style={{ borderRadius: '10px', backgroundColor: '#f8f9fa', border: '1px solid #ced4da' }}
              >
                <option value="" disabled selected>
                  Qty
                </option>
                {arr.map((e, i) => (
                  <option key={i + 1} value={i + 1}>
                    {`${i + 1}`}
                  </option>
                ))}
              </select>

              {/* Dropdown for pieces options */}
              <select
                className="form-select"
                style={{ borderRadius: '10px', backgroundColor: '#d4edda', border: '1px solid #c3e6cb' }}
              >
                {piecesOptions.map((data) => (
                  <option key={data} value={data}>
                    {data}
                  </option>
                ))}
              </select>
            </div>
            <button
              className="btn btn-success mt-3 w-100"
              style={{
                borderRadius: '10px',
                transition: 'background-color 0.3s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#218838')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#28a745')}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
