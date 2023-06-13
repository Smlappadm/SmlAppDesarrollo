
function ReturnToPage() {
  const regresar = () => {
    window.history.back();
  };

  return (
    <div className="flex items-center flex-col justify-start  h-screen bg-[#39394b] min-w-[190px]">
      <img
        className="opacity-80 w-44 mt-16"
        src="https://cdn.discordapp.com/attachments/1105243107555037294/1106577865698459788/White_Logo_Social_Media_Lab.png"
      />
              <button
          type="button"
          className="py-1.5 mt-16 px-4 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          onClick={regresar}
        >
          Regresar
        </button>
    </div>
  );
}

export default ReturnToPage;
