import React from "react";

function Analytic() {
  return (
    <div className="flex flex-col h-screen w-screen">
      {/* <iframe
        title="dashboard SML"
        width="100%"
        height="100%"
        src="https://app.powerbi.com/view?r=eyJrIjoiY2NlZGM5ZjItODdjYS00YmM1LTgzODMtMDAzNTYyYjcxZjVkIiwidCI6ImZhMTYyNmJlLTUxMDMtNGM5MC1iYzJmLTY2NzAxMWIzMzAwYyJ9&pageName=ReportSection"
        frameborder="0"
        allowFullScreen="true"
      ></iframe> */}
      <iframe
        title="Report Section"
        width="100%"
        height="100%"
        src="https://app.powerbi.com/view?r=eyJrIjoiZDgwODliOWMtNTQyNi00NmUwLWEyNWUtZDk2ODM5ZDBkNjk3IiwidCI6ImZhMTYyNmJlLTUxMDMtNGM5MC1iYzJmLTY2NzAxMWIzMzAwYyJ9"
        frameborder="0"
        allowFullScreen="true"
      ></iframe>
    </div>
  );
}

export default Analytic;
