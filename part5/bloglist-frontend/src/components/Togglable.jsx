import { forwardRef, useState, useImperativeHandle } from "react";

const Togglable = forwardRef(({ buttonLabel, children }, ref) => {
  const [showContent, setShowContent] = useState(false);

  const toggleShowContent = () => {
    setShowContent(!showContent);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleShowContent,
    };
  });

  return (
    <div>
      <button
        style={{ display: showContent && "none" }}
        onClick={toggleShowContent}
      >
        {buttonLabel}
      </button>
      <div style={{ display: !showContent && "none" }}>
        {children}
        <button onClick={toggleShowContent}>Cancel</button>
      </div>
    </div>
  );
});

Togglable.displayName = "Togglable";

export default Togglable;
