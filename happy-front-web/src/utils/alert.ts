import Swal from 'sweetalert2';

function Alert(title: string, iconType: string, showConfirmButton: boolean) {
    Swal.fire({
        position: 'center',
        icon: iconType === 'success'? 'success' : 'warning',
        title,
        showConfirmButton,
        timer: showConfirmButton === true ? undefined : 1500,
    });
}

export default Alert;
