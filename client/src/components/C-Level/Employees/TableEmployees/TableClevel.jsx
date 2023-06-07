import { useState, useEffect } from "react";
import style from "./TableClevel.module.css";
import PaginationOutlined from "../../../pagination/PaginationOutlined";
import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Title,
} from "@tremor/react";
import { CiMail } from "react-icons/ci";
import {
  getAllEmployees,
} from "../../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import NestedModal from "./MaterialUi/NestedModal";
import NestedModalEdit from "./MaterialUi/Edit/NestedModalEdit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BannedEmployees = (name) => {
  toast.success(`✔ ${name} Successful banning process completed! `, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};
const ErrorEmployees = (name) => {
  toast.error(`❌ Error banning Employ ${name}! `, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};
const EditEmployees = (name) => {
  toast.success(`✔ ${name} Successful edit process completed! `, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};
const ErrorEditEmployees = (name) => {
  toast.error(`❌ Error edit Employ ${name}! `, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};
const CreateEmployees = (name) => {
  toast.success(`✔ ${name} Successful create process completed! `, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};
const ErrorCreateEmployees = (name) => {
  toast.error(`❌ Error create Employ ${name}! `, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};

export const TableClevel = () => {
  // const { corredores, vendedores, clevel, leader } = useSelector(
  //   (state) => state
  // );
  const { allEmployees } = useSelector((state) => state);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getAllCorredores());
  //   dispatch(getAllVendedores());
  //   dispatch(getAllLeader());
  //   dispatch(getAllClevel());
  // }, [dispatch]);

  useEffect(() => {
    dispatch(getAllEmployees());
  }, [dispatch]);

  // let employees = corredores.concat(vendedores, clevel, leader);

  const [pageStyle, setPageStyle] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardXPage, setCardXpage] = useState(10);
  const indexLastCard = currentPage * cardXPage;
  const indexFirstCard = indexLastCard - cardXPage;
  const currentCard = allEmployees.slice(indexFirstCard, indexLastCard);

  const pages = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className=" flex flex-col justify-start items-center w-full h-screen">
        <ToastContainer />
        <Card className="bg-[#222131] rounded-none w-full h-screen p-5">
          <div className="flex justify-between items-center">
            <Title className="font-bold text-[#e2e2e2] text-lg">
              Employees
            </Title>
            <NestedModal
              CreateEmployees={CreateEmployees}
              ErrorCreateEmployees={ErrorCreateEmployees}
            />
          </div>
          <Table className="w-full">
            <TableHead className={style.tableHead}>
              <TableRow className={style.tableRow}>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>Email</TableHeaderCell>
                <TableHeaderCell>Phone Number</TableHeaderCell>
                <TableHeaderCell>Position</TableHeaderCell>
                <TableHeaderCell>
                  <h1></h1>
                </TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody className={style.tableBody}>
              {currentCard.map((item, index) => (
                <TableRow key={index} className={style.tableCards}>
                  <TableCell className="flex justify-start items-center p-0">
                    {/* <img
                      className="w-8 ml-2 mr-4 rounded-full"
                      src={item.photo}
                      alt="avatar image"
                    /> */}
                    <Text>{item.name}</Text>
                  </TableCell>
                  <TableCell className="flex justify-start items-center p-0">
                    <CiMail className={style.icon} />
                    <Text>{item.email}</Text>
                  </TableCell>
                  <TableCell className="p-0 mx-3">
                    <Text>{item.contactNumber}</Text>
                  </TableCell>
                  <TableCell className="p-0">
                    <Text
                      className={` 
                      ${item.rol === "clevel" ? "bg-[#ac4242]" : null} 
                      ${item.rol === "leader" ? "bg-[#1b7757]" : null}  
                      ${item.rol === "corredor" ? "bg-[#2148b4]" : null}  
                      ${
                        item.rol === "vendedor" ? "bg-[#8a912b]" : null
                      } text-center p-1 w-20 rounded-lg`}
                    >
                      {item.rol}
                    </Text>
                  </TableCell>
                  <TableCell className="p-0 relative">
                    <div className="ml-20 pl-2">
                      <NestedModalEdit
                        itemId={item._id}
                        itemName={item.name}
                        itemEmail={item.email}
                        itemPhone={item.contactNumber}
                        itemRol={item.rol}
                        ErrorEmployees={ErrorEmployees}
                        BannedEmployees={BannedEmployees}
                        EditEmployees={EditEmployees}
                        ErrorEditEmployees={ErrorEditEmployees}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        <div className=" mb-6">
          <PaginationOutlined
            pageStyle={pageStyle}
            setPageStyle={setPageStyle}
            cardXPage={cardXPage}
            data={allEmployees}
            pages={pages}
            current={currentPage}
          />
        </div>
      </div>
    </>
  );
};
