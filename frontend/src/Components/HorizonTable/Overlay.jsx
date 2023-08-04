import styled from "styled-components";
const OverlayWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(56, 50, 41, 0.15);
  z-index: 1000;
`;
export const Overlay = ({ children, ...props }) => {
  return (
    <OverlayWrapper {...props}>
      <div
        style={{
          background: "rgba(56, 50, 41, 0.15)",
          padding: "16px"
        }}
      >
        {children}
      </div>
    </OverlayWrapper>
  );
};
