// ============================================================
//  src/components/Avatar.jsx
//  Componente de avatar com iniciais coloridas
// ============================================================

import PropTypes from "prop-types";

Avatar.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
};

import { getInitials } from "../utils/formatters";

/**
 * @param {{ name: string, size?: number }} props
 */
export function Avatar({ name, size = 40 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "linear-gradient(135deg, #C8A96E, #E8C87A)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: size * 0.35,
        color: "#1A1F2E",
        flexShrink: 0,
      }}
    >
      {getInitials(name)}
    </div>
  );
}
