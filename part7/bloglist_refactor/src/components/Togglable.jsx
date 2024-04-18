import { forwardRef, useState, useImperativeHandle } from 'react';

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
    <div style={{ margin: '12px 0 -5px 12px' }}>
      <button
        style={{
          display: showContent && 'none',
          padding: '8px 16px',
          backgroundColor: 'green',
          border: 'none',
          color: 'white',
          borderRadius: '5px',
        }}
        onClick={toggleShowContent}
      >
        {buttonLabel}
      </button>
      <div style={{ display: !showContent && 'none' }}>
        {children}
        <button
          onClick={toggleShowContent}
          style={{
            border: 'none',
            borderRadius: '4px',
            backgroundColor: 'red',
            color: 'white',
            padding: '6px 28px',
            width: '100%',
            maxWidth: '180px',
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
});

Togglable.displayName = 'Togglable';

export default Togglable;
