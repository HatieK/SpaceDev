import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ErrorText } from "../Input/style";

const Select = ({ value, onChange, error, placeholder, options }) => {
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState(() => {
    return options.find((e) => e.value === value);
  });

  useEffect(() => {
    const onClose = () => setOpen(false);
    window.addEventListener("click", onClose);

    return () => {
      window.removeEventListener("click", onClose);
    };
  }, []);

  const onOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const _onChange = (index) => {
    return (ev) => {
      ev.preventDefault();
      setLabel(options[index].label);
      onChange?.({ target: { value: options[index].value } });
    };
  };

  return (
    <>
      <div className="select">
        <div className="head" onClick={onOpen}>
          {label || placeholder}
        </div>
        <div className="sub" style={{ display: open ? "block" : "none" }}>
          {options?.map((e, i) => {
            return (
              <a onClick={_onChange(i)} key={e.value}>
                {e.label}
              </a>
            );
          })}
        </div>
        {error && <ErrorText>{error}</ErrorText>}
      </div>
    </>
  );
};

export default Select;
