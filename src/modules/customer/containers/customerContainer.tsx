import { useEffect, useState } from "react";
import { CustomerTable } from "../components/tableCustomer";
import { useCustomer, CustomerDelete } from "../hooks/customerHooks";
import { useCustomerEdit,useCustomerCreate } from "../hooks/modalCustomer";
import { AlertMessage } from "../../../core/components/AlertMessage";

const CustomerContainer = () => {
  const [alert, setAlert] = useState(false);
  const { submitCustomers, message, type ,resetMessage} = useCustomerCreate();
  const { Deletecustomer, messageDelete, typeDelete ,resetMessageDelete} = CustomerDelete();
  const { editCustomers, messageEdit, typeEdit ,resetMessageEdit} = useCustomerEdit();
  const currentMessage = messageDelete || message || messageEdit;
  const currentType = typeDelete || type ||typeEdit;
  const  [page, setPage] = useState(0);
  const  [size, setSize] = useState(10);
  const  [search, setsearch] = useState("");
  const { customers, fetchCustomers ,customersResponse} = useCustomer(page,size,search);

  const resetAlert = () => {
    resetMessage();
    resetMessageDelete();
    resetMessageEdit();
    setAlert(false);
  };
  const triggerAlert = () => {
    setAlert(true);
    setTimeout(() => {
      resetAlert(); 
    }, 3000); 
  };
  
  useEffect(() => {
    fetchCustomers();
  }, [page, size,search]);

  return (
    <div className="p-4">
      {alert && (
        <AlertMessage
          open={alert}
          onClose={() => setAlert(false) }
          title="¡Categoría!"
          message={currentMessage}
          severity={currentType}
        />
      )}
      <CustomerTable 
      customer={customers} submitCustomers={submitCustomers} onDelete={Deletecustomer} onEdit={editCustomers} triggerAlert={triggerAlert} fetchCustomers={fetchCustomers} setPage={setPage} setSize={setSize} setSearch={setsearch} customerResponse={customersResponse} />
    </div>
  );
};

export default CustomerContainer;
