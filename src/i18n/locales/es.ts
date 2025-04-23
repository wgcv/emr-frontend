
export const es = {
  menu:{
    home: 'Inicio',
    clinics: 'Clínicas',
    users: 'Usuarios',
    createClinics: 'Crear clínicas',
    inviteClinicOwner: 'Invitar Propietario de Clínica',
  },
  userMenu:{
    profile: 'Perfil',
    settings: 'Ajustes',
    logout: 'Cerrar Sesión',
  },
  clinic: {
    title: 'Crear Nueva Clínica',
    viewTitle: 'Clínicas',
    detailsTitle: 'Detalle de la clínica',
    basicInfo: 'Información Básica', 
    id: 'ID',
    
    submit: 'Crear nueva Clínica',
    addOwner: "Añadir propietario",
    addVeterinary: "Añadir veterinario",

    validation: {
      nameRequired: 'El nombre de la clínica es requerido',
      addressRequired: 'La dirección es requerida',
      cityRequired: 'La ciudad es requerida',
      countryRequired: 'El país es requerido',
      phoneRequired: 'El número de teléfono es requerido',
      emailRequired: 'El correo electrónico es requerido',
      emailInvalid: 'Correo electrónico inválido'
    },
    messages:{
      createSuccess: 'Clínica creada exitosamente',
    },
    error:{
      notFound: "Clínica no encontrada",
    },
    clinicOwner:{
      createTitle: "Crear Propietario de la clínica",
      createSuccess: 'Propietario creado exitosamente',

    }
  },
  veterinary:{
    addTitle: "Añadir Veterinario",
    createSuccess: 'Veterinario creado exitosamente',
  },
  user: {
    viewTitle: "Usuarios",
    detailsTitle: "Detalles del Usuario",
    editTitle: "Editar Usuario",
    addTitle: "Agregar Usuario",
    submit: "Crear Usuario",
    changeClinic: "Cambiar clínica",
    changePermissions: "Cambiar permisos",
    error:{
      loading: "Error al cargar Usuarios"
    },
    validation: {
      nameRequired: 'Nombre es requerido',
      lastNameRequired: 'Apellido es requerido',
      emailRequired: 'Email es requerido',
      phoneRequired: 'Número de teléfono es requerido',
      emailInvalid: 'Correo electrónico inválido'
    },  
     access:{
      title: "Permisos",

      actor: 'Actor',
      roles: 'Roles',
      isActive: 'Activo',
    }

  },
  common:{
    search: "Búsqueda",
    create: "Crear",
    edit: "Editar",
    rowPerPage: "Filas por página",
    of: "de",
    loading: "Cargando",
    name: "Nombre",
    lastName: "Apellido",
    email: "Correo electrónico",
    notFound: "Error, no se puede encontrar resultados",
    addressInfo: 'Información de la dirección',
    basicInfo: 'Información Básica',
    addressLine1: 'Dirección Línea 1',
    addressLine2: 'Dirección Línea 2',
    city: 'Ciudad',
    country: 'País',
    zipcode: 'Código Postal',
    phone: 'Número de Teléfono',
    active: 'Activo',
    countryCode: 'Código de País',
    update: 'Actualizar',

    clinic: 'Clínica',

    validation:{
      lastNameRequired: "Appellido es requerido",
      nameRequired: "Nombre es requerido",
      emailRequired: "Email es requerido",
      emailInvalid: "Email es inválido",
      phoneInvalid: "Número de Teléfono es inválido",
      addressRequired: "Dirección es requerida",
    },
    createdAt: "Creado en",
    updatedAt: "Actualizado en",
  },
  
  settings:{
    language: "Seleccionar idioma",
    theme: "Seleccionar tema",
  },
  footer:{
    allRightsReserved: "Todos los derechos reservados."
  }
};