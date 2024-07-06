import { useState } from "react";
import Swal from "sweetalert2";

const useSweetAlert = () => {
  const [isAlertVisible, setAlertVisible] = useState(false);

  const showAlert = async ({
    title,
    text,
    icon,
    showCancelButton = false,
    onConfirm,
    onCancel,
  }) => {
    setAlertVisible(true);

    const result = await Swal.fire({
      title,
      text,
      icon,
      showCancelButton,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
    });

    setAlertVisible(false);

    if (result.isConfirmed) {
      onConfirm && onConfirm();
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      onCancel && onCancel();
    }

    return result;
  };

  return { isAlertVisible, showAlert };
};

export default useSweetAlert;
