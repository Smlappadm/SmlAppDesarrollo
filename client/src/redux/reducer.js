import {
  GET_ALL_LEAD,
  GET_LEAD_UNCHECKED,
  GET_LEAD_CHEQUED,
  GET_LEAD_UNCHECKED_10,
  GET_LEAD_CHEQUED_INACTIVE_5,
  ORDER_CLIENTS,
  ORDER_CATEGORY,
  FILTER_LEVEL,
  FILTER_STATUS,
  GET_ALL_CORREDORES,
  GET_ALL_VENDEDORES,
  GET_ALL_LEADER,
  GET_ALL_CLEVEL,
  GET_VENDEDOR_ALL_LEADS,
  GET_LEADS_LLAMADA_VENTA,
  GET_EMPLOYEES,
  SET_ROL,
  SET_ACCESS,
  GET_CORREDOR_LEAD,
  GET_CORREDOR_LEAD_CHECKED,
  FIND_CORREDORES_NAME,
  FIND_VENDEDORES_NAME,
  GET_ALL_EMPLOYEES,
  GET_ALL_PROFESION,
  GET_ALL_COUNTRY,
} from "./actions";

const initialState = {
  lead: [],
  leadChequed: [],
  leadCheckedInactive5: [],
  leadUnchecked: [],
  leadUnchecked10: [],
  leaderDashboard: [],
  vendedoresDashboard: [],
  corredores: [],
  vendedores: [],
  leader: [],
  clevel: [],
  vendedorAllLeads: [],
  LeadsLlamadaVenta: [],
  employees: [],
  rol: undefined,
  isEmployee: undefined,
  corredorLead: [],
  corredorLeadChecked: [],
  allEmployees: [],
  allProfesion: [],
  allCountries: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ROL:
      return {
        ...state,
        rol: action.payload,
      };
    // ...
    case SET_ACCESS:
      return {
        ...state,
        isEmployee: action.payload,
      };

    case GET_EMPLOYEES:
      return {
        ...state,
        employees: action.payload,
      };

    case GET_ALL_LEAD:
      return {
        ...state,
        lead: action.payload,
      };
    case GET_LEAD_UNCHECKED:
      return {
        ...state,
        leadUnchecked: action.payload,
      };
    case GET_LEAD_UNCHECKED_10:
      return {
        ...state,
        leadUnchecked10: action.payload,
      };
    case GET_LEAD_CHEQUED:
      return {
        ...state,
        leaderDashboard: action.payload,
        leadChequed: action.payload,
      };
    case GET_LEAD_CHEQUED_INACTIVE_5:
      return {
        ...state,
        leadCheckedInactive5: action.payload,
        vendedoresDashboard: action.payload,
      };

    case ORDER_CLIENTS:
      const copyClient = [...state.leaderDashboard];
      if (action.payload === "DES") {
        copyClient.sort((a, b) => {
          const clientA = a.name ? a.name.toLowerCase() : "";
          const clientB = b.name ? b.name.toLowerCase() : "";
          return clientB.localeCompare(clientA, "default", {
            sensitivity: "accent",
          });
        });
      } else {
        copyClient.sort((a, b) => {
          const clientA = a.name ? a.name.toLowerCase() : "";
          const clientB = b.name ? b.name.toLowerCase() : "";
          return clientA.localeCompare(clientB, "default", {
            sensitivity: "accent",
          });
        });
      }
      return {
        ...state,
        leaderDashboard: copyClient,
      };
    case ORDER_CATEGORY:
      const copyCategory = [...state.leaderDashboard];
      if (action.payload === "DES") {
        copyCategory.sort((a, b) => {
          const clientA = a.profesion ? a.profesion.toLowerCase() : "";
          const clientB = b.profesion ? b.profesion.toLowerCase() : "";
          return clientB.localeCompare(clientA, "default", {
            sensitivity: "accent",
          });
        });
      } else {
        copyCategory.sort((a, b) => {
          const clientA = a.profesion ? a.profesion.toLowerCase() : "";
          const clientB = b.profesion ? b.profesion.toLowerCase() : "";
          return clientA.localeCompare(clientB, "default", {
            sensitivity: "accent",
          });
        });
      }
      return {
        ...state,
        leaderDashboard: copyCategory,
      };
    case FILTER_LEVEL:
      const copyLevel = [...state.leadChequed];
      let filteredLevel = copyLevel;
      const copyLevelVendedores = [...state.leadCheckedInactive5];
      let filteredLevelVendedores = copyLevelVendedores;

      if (action.payload === "0") {
        filteredLevel = copyLevel.filter((client) => {
          const clientLevel = client.level ? client.level : "";
          return clientLevel === "0";
        });
        filteredLevelVendedores = copyLevelVendedores.filter((client) => {
          const clientLevel = client.level ? client.level : "";
          return clientLevel === "0";
        });
      }
      if (action.payload === "1") {
        filteredLevel = copyLevel.filter((client) => {
          const clientLevel = client.level ? client.level : "";
          return clientLevel === "1";
        });
        filteredLevelVendedores = copyLevelVendedores.filter((client) => {
          const clientLevel = client.level ? client.level : "";
          return clientLevel === "1";
        });
      }
      if (action.payload === "2") {
        filteredLevel = copyLevel.filter((client) => {
          const clientLevel = client.level ? client.level : "";
          return clientLevel === "2";
        });
        filteredLevelVendedores = copyLevelVendedores.filter((client) => {
          const clientLevel = client.level ? client.level : "";
          return clientLevel === "2";
        });
      }
      if (action.payload === "incidencia") {
        filteredLevel = copyLevel.filter((client) => {
          const clientLevel = client.level ? client.level : "";
          return clientLevel === "incidencia";
        });
        filteredLevelVendedores = copyLevelVendedores.filter((client) => {
          const clientLevel = client.level ? client.level : "";
          return clientLevel === "incidencia";
        });
      }
      return {
        ...state,
        leaderDashboard: filteredLevel,
        vendedoresDashboard: filteredLevelVendedores,
      };
    case FILTER_STATUS:
      const copyStatus = [...state.leadChequed];
      let filteredStatus = copyStatus;

      if (action.payload === "contratado") {
        filteredStatus = copyStatus.filter((client) => {
          const clientStatus = client.status ? client.status : "";
          return clientStatus === "Contratado";
        });
      }
      if (action.payload === "no-responde") {
        filteredStatus = copyStatus.filter((client) => {
          const clientstatus = client.status ? client.status : "";
          return clientstatus === "No responde";
        });
      }
      if (action.payload === "rechazado") {
        filteredStatus = copyStatus.filter((client) => {
          const clientStatus = client.status ? client.status : "";
          return clientStatus === "Rechazado";
        });
      }
      if (action.payload === "sin-contactar") {
        filteredStatus = copyStatus.filter((client) => {
          const clientStatus = client.status ? client.status : "";
          return clientStatus === "Sin contactar";
        });
      }
      return {
        ...state,
        leaderDashboard: filteredStatus,
      };
    case FIND_CORREDORES_NAME:
      const corredorName = action.payload;
      const CorredorNameSort = corredorName.sort(
        (a, b) => (b ? b.level : "") - (a ? a.level : "")
      );
      return {
        ...state,
        leaderDashboard: action.payload,
      };
    case FIND_CORREDORES_NAME:
      const vendedorName = action.payload;
      const vendedorNameSort = vendedorName.sort(
        (a, b) => (b ? b.level : "") - (a ? a.level : "")
      );
      return {
        ...state,
        leaderDashboard: action.payload,
      };
    case GET_ALL_CORREDORES:
      return {
        ...state,
        corredores: action.payload,
      };
    case GET_ALL_VENDEDORES:
      return {
        ...state,
        vendedores: action.payload,
      };
    case GET_ALL_LEADER:
      return {
        ...state,
        leader: action.payload,
      };
    case GET_ALL_CLEVEL:
      return {
        ...state,
        clevel: action.payload,
      };
    case GET_VENDEDOR_ALL_LEADS:
      return {
        ...state,
        vendedorAllLeads: action.payload,
      };
    case GET_LEADS_LLAMADA_VENTA:
      return {
        ...state,
        LeadsLlamadaVenta: action.payload,
      };
    case GET_CORREDOR_LEAD:
      return {
        ...state,
        corredorLead: action.payload,
      };
    case GET_CORREDOR_LEAD_CHECKED:
      return {
        ...state,
        corredorLeadChecked: action.payload,
      };

    case GET_ALL_EMPLOYEES:
      return {
        ...state,
        allEmployees: action.payload,
      };
    case GET_ALL_PROFESION:
      return {
        ...state,
        allProfesion: action.payload,
      };
    case GET_ALL_COUNTRY:
      return {
        ...state,
        allCountries: action.payload,
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
