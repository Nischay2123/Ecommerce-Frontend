
import { Column } from "react-table";
import TableHOC from "../Components/admin/TableHOC"
import { ReactElement, useState } from "react";
import { Link } from "react-router-dom";
type dataType={
  _id: string;
  amount: number;
  quantity: number;
  discount: number;
  status: ReactElement;
  action: ReactElement;
}

const column: Column<dataType>[] = [
  {
    Header: "ID",
    accessor: "_id",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Orders = () => {

  const [rows] = useState<dataType[]>([
    {
      _id:" daoiasofja",
      amount: 45454,
      quantity: 23,
      discount: 566,
      status: <span className="red">
        Processing
      </span>,
      action: <Link to={"/orders/daoiasofja"}>View</Link>
    }
  ])
  const Table = TableHOC<dataType>(column,rows,"dashboard-product-box","Orders",rows.length>6)()
  return (
    <div className="container">
      <h1>My Orders</h1>
      {Table}
    </div>
  )
}

export default Orders