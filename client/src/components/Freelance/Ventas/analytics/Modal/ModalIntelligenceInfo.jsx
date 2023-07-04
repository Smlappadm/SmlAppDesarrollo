import * as React from "react";
import axios from "axios";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { CiWarning, CiEdit } from "react-icons/ci";
import { useUser } from "@clerk/clerk-react";
import { orderCategory } from "../../../../redux/actions";
import { AiOutlineInfoCircle } from "react-icons/ai";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: 850,
  bgcolor: "#39394B",
  border: "none",
  boxShadow: 24,
  pt: 4,
  px: 6,
  pb: 4,
};

export default function ModalIntelligentInfo({ item }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  const formattedUpdate = () => {
    let fechaYear = "";
    let fechaMonth = "";
    let fechaDay = "";
    let timeHour = "";
    let timeMinute = "";
    for (let i = 0; i < item.updatedAt.length; i++) {
      if (i < 4) {
        fechaYear += item.updatedAt[i];
      } else if (i >= 5 && i < 7) {
        fechaMonth += item.updatedAt[i];
      } else if (i >= 8 && i < 10) {
        fechaDay += item.updatedAt[i];
      } else if (i >= 11 && i < 13) {
        timeHour += item.updatedAt[i];
      }
      if (i >= 13 && i < 19) {
        timeMinute += item.updatedAt[i];
      }
    }

    return (
      <p htmlFor="" className="text-white m-2">
        {`Date: ${fechaDay}/${fechaMonth}/${fechaYear} - Hour: ${
          timeHour - 3
        }${timeMinute}`}
      </p>
    );
  };

  return (
    <div>
      <div className="flex gap-4">
        <AiOutlineInfoCircle
          className="border-2  border-[#dddb6376] text-1 text-[#dddb63b0] w-10 h-8 rounded-md cursor-pointer"
          onClick={handleOpen}
        />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 580, borderRadius: 5 }}>
          <div className="flex flex-col items-center justify-center gap-y-7">
            <h1 className="text-24 text-[#e4e1e1]">Información IA</h1>
            <div>
              <p className="text-[#dddddd] text-justify text-16 ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequatur eum tempora enim corrupti ipsam, a soluta itaque
                maiores consequuntur ab perspiciatis amet neque recusandae,
                totam placeat labore! Laborum beatae praesentium fugiat
                reprehenderit, quidem eos rem iste. Animi eum aut minima, eos
                consectetur officia corrupti porro magnam aliquid maxime placeat
                consequatur blanditiis id atque quidem amet ex facilis, illo
                veniam explicabo quas recusandae at. Officiis praesentium quos
                velit dolor. Ad, culpa? Culpa esse molestias laboriosam modi
                harum ipsum nam! Cumque perferendis id delectus corporis dolore,
                dolores pariatur saepe sint neque aspernatur! Voluptas, error
                temporibus architecto vel velit laudantium dicta. Eligendi odit
                rerum, officia veniam mollitia dolor consequatur quidem deleniti
                ea voluptatem! Autem fugit deserunt soluta libero, in quisquam
                ullam alias eaque laboriosam excepturi. Aut sapiente quae enim
                deserunt dolorum. Omnis, amet dicta! Eos nesciunt aliquid iste
                cumque, distinctio pariatur. Sunt aspernatur amet dolor, eos
                facere dignissimos quos maiores. Iusto, dignissimos. Veritatis
                autem repellat optio debitis unde? Reprehenderit optio dolorum
                alias atque ut repudiandae consequatur. Assumenda soluta cumque
                perferendis commodi, consequuntur doloribus molestiae neque
                ratione quae officia unde dicta quos ad itaque, modi
                exercitationem atque architecto consectetur autem ab
                necessitatibus ut, adipisci culpa. Consequuntur sequi incidunt
                possimus quas commodi at earum cum!
              </p>
            </div>
            <button
              type="button"
              className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              onClick={handleClose}
            >
              Close x
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
