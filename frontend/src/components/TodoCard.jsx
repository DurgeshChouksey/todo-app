import "../styles/card.css";

const TodoCard = (props) => {
  const {
    title,
    description,
    priority,
    date,
    completed,
    catagory, // NOTE: Consider fixing spelling to 'category'
    deleteHandler,
    onToggle,
  } = props;

  return (
    <div className="wrapper">
      <div className="todo-container">
        {/* Header with title and priority */}
        <div className="header_wrapper">
          <h2
            className="title"
            style={{ textDecoration: completed ? "line-through" : "none" }}
          >
            {title}
          </h2>
          <p className="priority">{priority}</p>
        </div>

        {/* Todo description */}
        <p
          className="description"
          style={{ textDecoration: completed ? "line-through" : "none" }}
        >
          {description}
        </p>

        {/* Category tags */}
        <div className="categories aligned-right">
          {catagory &&
            catagory.map((tag, index) => (
              <span key={index} className="category-tag">
                {tag}
              </span>
            ))}
        </div>

        {/* Action buttons */}
        <div className="button-group aligned-right">
          <button className="delete" onClick={deleteHandler}>
            Delete
          </button>
          <button className="completed" onClick={onToggle}>
            Completed
          </button>
        </div>

        {/* Date shown at bottom */}
        <p className="date centered">{new Date(date).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default TodoCard;
