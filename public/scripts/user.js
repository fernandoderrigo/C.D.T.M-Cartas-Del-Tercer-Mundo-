document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('/api/users/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }

    const data = await response.json();
    const { user } = data;

    // Mostrar los datos del usuario en el HTML
    document.getElementById('username-display').textContent = user.username;
    document.getElementById('email-display').textContent = user.email;

    // Manejar el cambio de contraseña
    const saveChangesButton = document.getElementById('save-changes-button');
    saveChangesButton.addEventListener('click', async () => {
      const newPassword = document.getElementById('new-password').value;
      const confirmPassword = document.getElementById('confirm-password').value;

      if (newPassword !== confirmPassword) {
        document.getElementById('password-error-message').style.display = 'block';
        document.getElementById('password-error-message').textContent = 'Las contraseñas no coinciden';
        return;
      }

      try {
        const response = await fetch('/api/users/profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ password: newPassword })
        });

        if (!response.ok) {
          throw new Error('Failed to update password');
        }

        // Limpiar los campos y mostrar mensaje de éxito
        document.getElementById('new-password').value = '';
        document.getElementById('confirm-password').value = '';
        document.getElementById('password-error-message').style.display = 'none';
        Swal.fire('¡Contraseña actualizada!', '', 'success');
      } catch (error) {
        console.error('Error al actualizar la contraseña:', error);
        Swal.fire('Error', 'No se pudo actualizar la contraseña', 'error');
      }
    });

    // Manejar la eliminación de la cuenta
    const deleteAccountButton = document.getElementById('delete-account-button');
    deleteAccountButton.addEventListener('click', async () => {
      const confirmDelete = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'No podrás revertir esta acción',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar cuenta'
      });

      if (confirmDelete.isConfirmed) {
        try {
          const response = await fetch('/api/users/delete', {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });

          if (!response.ok) {
            throw new Error('Failed to delete account');
          }

          // Limpiar el token del almacenamiento local y redirigir al inicio
          localStorage.removeItem('token');
          window.location.replace('/');
        } catch (error) {
          console.error('Error al eliminar la cuenta:', error);
          Swal.fire('Error', 'No se pudo eliminar la cuenta', 'error');
        }
      }
    });

  } catch (error) {
    console.error('Error al cargar el perfil del usuario:', error);
    Swal.fire('Error', 'No se pudo cargar el perfil del usuario', 'error');
  }
});
