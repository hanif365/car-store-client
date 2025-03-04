/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation } from "react-router-dom";
import { useVerifyOrderQuery } from "@/redux/features/order/orderApi";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import Loader from "@/components/Shared/Loader/Loader";

const OrderDetailsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const order_id = queryParams.get("order_id");
  const { data, isLoading } = useVerifyOrderQuery(order_id);

  const orderData = data?.data[0];

  const downloadPDF = () => {
    const doc = new jsPDF();
    let yPos = 20;

    // Invoice Header
    doc.setFontSize(20);
    doc.text("INVOICE", 14, yPos);
    doc.setFontSize(12);
    yPos += 10;
    doc.text("Car Store Inc.", 14, yPos);
    yPos += 8;
    doc.text(`Invoice #${orderData.invoice_no}`, 14, yPos);
    yPos += 8;
    doc.text(
      `Date: ${new Date(orderData.date_time).toLocaleDateString()}`,
      14,
      yPos
    );
    yPos += 20;

    // Bill To & Payment Details in two columns
    autoTable(doc, {
      startY: yPos,
      theme: "grid",
      body: [
        [
          {
            content: "Bill To:",
            styles: { fontStyle: "bold", fontSize: 14 },
          },
          {
            content: "Payment Details:",
            styles: { fontStyle: "bold", fontSize: 14 },
          },
        ],
        [
          [
            orderData.name,
            orderData.email,
            orderData.phone_no,
            orderData.address,
            orderData.city,
          ].join("\n"),
          [
            `Status: ${orderData.bank_status}`,
            `Method: ${orderData.method}`,
            `Currency: ${orderData.currency}`,
            `Amount: ${new Intl.NumberFormat("en-BD", {
              style: "currency",
              currency: "BDT",
            }).format(orderData.amount)}`,
            `Payable Amount: ${new Intl.NumberFormat("en-BD", {
              style: "currency",
              currency: "BDT",
            }).format(orderData.payable_amount)}`,
          ].join("\n"),
        ],
      ],
      columnStyles: {
        0: { cellWidth: 90, halign: "left" },
        1: { cellWidth: 90, halign: "left" },
      },
      styles: { fontSize: 12, cellPadding: 2 },
    });

    yPos = (doc as any).lastAutoTable.finalY + 10;

    // Transaction Details
    autoTable(doc, {
      startY: yPos,
      theme: "grid",
      body: [
        [
          {
            content: "Transaction Details",
            colSpan: 2,
            styles: { fontStyle: "bold", fontSize: 14 },
          },
        ],
        ["SP Code:", orderData.sp_code],
        ["SP Message:", orderData.sp_message],
        ["Transaction ID:", orderData.bank_trx_id],
        ["Order ID:", orderData.order_id],
      ],
      columnStyles: {
        0: { cellWidth: 50, halign: "left" },
        1: { cellWidth: 130, halign: "left" },
      },
      styles: { fontSize: 12, cellPadding: 2 },
    });

    yPos = (doc as any).lastAutoTable.finalY + 15;

    // Transaction Time
    doc.setFontSize(12);
    doc.text(
      `Transaction Time: ${new Date(orderData.date_time).toLocaleTimeString()}`,
      14,
      yPos
    );
    yPos += 10;

    // Thank you message
    doc.setTextColor(100, 100, 100);
    doc.text("Thank you for your business", 14, yPos);
    yPos += 6;
    doc.text("Car Store Inc.", 14, yPos);

    doc.save(`invoice-${orderData.invoice_no}.pdf`);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-base sm:text-lg md:text-xl">
        No order found.
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full max-w-7xl mx-auto p-6 sm:p-6 md:p-6 lg:p-8">
      <div className="bg-white shadow-md rounded-xl p-4 sm:p-6 md:p-8 lg:p-10 mt-12 sm:mt-16 md:mt-20">
        <button
          onClick={downloadPDF}
          className="w-full sm:w-auto px-4 py-2.5 mb-6 bg-brand-primary text-white text-sm sm:text-base rounded-lg hover:bg-opacity-90 transition-colors duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary"
        >
          Download PDF
        </button>

        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8 border-b pb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              INVOICE
            </h1>
            <p className="text-sm sm:text-base text-gray-600">Car Store Inc.</p>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">
              #{orderData.invoice_no}
            </p>
            <p className="text-sm sm:text-base text-gray-600">
              {new Date(orderData.date_time).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 lg:gap-12 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
              Bill To:
            </h2>
            <div className="text-sm sm:text-base text-gray-600 space-y-2">
              <p className="font-medium text-gray-800">{orderData.name}</p>
              <p>{orderData.email}</p>
              <p>{orderData.phone_no}</p>
              <p className="break-words">{orderData.address}</p>
              <p>{orderData.city}</p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
              Payment Details:
            </h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:text-base">
              <p className="font-medium">Status:</p>
              <p className={`font-semibold ${orderData.bank_status === "Success" ? "text-green-600" : "text-red-600"}`}>
                {orderData.bank_status}
              </p>

              <p className="font-medium">Method:</p>
              <p>{orderData.method}</p>

              <p className="font-medium">Currency:</p>
              <p>{orderData.currency}</p>

              <p className="font-medium">Amount:</p>
              <p className="break-words">
                {new Intl.NumberFormat("en-BD", {
                  style: "currency",
                  currency: "BDT",
                }).format(orderData.amount)}
              </p>

              <p className="font-medium">Payable Amount:</p>
              <p className="break-words">
                {new Intl.NumberFormat("en-BD", {
                  style: "currency",
                  currency: "BDT",
                }).format(orderData.payable_amount)}
              </p>

              {orderData.discsount_amount && (
                <>
                  <p className="font-medium">Discount:</p>
                  <p className="break-words">
                    {new Intl.NumberFormat("en-BD", {
                      style: "currency",
                      currency: "BDT",
                    }).format(orderData.discsount_amount)}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 sm:p-6 mb-8">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
            Transaction Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base text-gray-600">
            <div className="space-y-2">
              <p className="font-medium">SP Code:</p>
              <p className="break-words bg-white p-2 rounded">{orderData.sp_code}</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium">SP Message:</p>
              <p className="break-words bg-white p-2 rounded">{orderData.sp_message}</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Transaction ID:</p>
              <p className="break-words bg-white p-2 rounded">{orderData.bank_trx_id}</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Order ID:</p>
              <p className="break-words bg-white p-2 rounded">{orderData.order_id}</p>
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="text-sm sm:text-base text-gray-600">
              <p>Transaction Time:</p>
              <p className="font-medium">
                {new Date(orderData.date_time).toLocaleTimeString()}
              </p>
            </div>
            <div className="text-left sm:text-right text-sm sm:text-base">
              <p className="text-gray-600">Thank you for your business</p>
              <p className="text-gray-600 font-medium">Car Store Inc.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
