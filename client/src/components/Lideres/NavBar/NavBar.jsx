import React from 'react'

export default function NavBar() {
  return (
    {titles.map((encabezado, index) => (
        <Link
          className="flex items-center justify-center gap-2 "
          to={encabezado.link}
          key={index}
        >
          {React.createElement(encabezado.icon, {
            className: `text-[2rem] text-[#418df0] ${
              encabezado.isHovered ? "hover:text-[#3570bd]" : ""
            }`,
            onMouseEnter: () => handleMouseEnter(index),
            onMouseLeave: () => handleMouseLeave(index),
          })}
          <motion.div
            className="flex items-center gap-2 text-white h-full "
            style={{
              width: encabezado.isHovered ? "fit-content" : "2rem",
            }}
            initial={{ width: 0 }}
            animate={{ width: encabezado.isHovered ? 100 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {encabezado.isHovered && (
              <motion.p
                className="text-white"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {encabezado.title}
              </motion.p>
            )}
          </motion.div>
        </Link>
      ))}
  )
}
