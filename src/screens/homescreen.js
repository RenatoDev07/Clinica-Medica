import React, { useState } from "react";

// ─── Dados de exemplo (substituir por API/Context) ───────────────────────────
const USER = {
  name: "Ana Souza",
  role: "Paciente",
  initials: "AS",
};

const NEXT_APPOINTMENT = {
  doctor: "Dr. Eduardo Oliveira",
  specialty: "Cardiologia",
  time: "09:30",
  day: "18",
  month: "Abr",
  location: "Sala 204",
};

const APPOINTMENTS = [
  {
    id: 1,
    doctor: "Dr. Carlos Mendes",
    specialty: "Cardiologia",
    date: "10 Abr",
    status: "done",
    initials: "CM",
    color: "#185FA5",
    bg: "#E6F1FB",
  },
  {
    id: 2,
    doctor: "Dra. Rita Braga",
    specialty: "Clínica Geral",
    date: "18 Abr",
    status: "pending",
    initials: "RB",
    color: "#0F6E56",
    bg: "#E1F5EE",
  },
  {
    id: 3,
    doctor: "Dr. Paulo Lima",
    specialty: "Ortopedia",
    date: "25 Abr",
    status: "pending",
    initials: "PL",
    color: "#993556",
    bg: "#FBEAF0",
  },
];

const EXAMS = [
  {
    id: 1,
    name: "Hemograma completo",
    date: "Resultado em 12 Abr",
    icon: "🩸",
    available: true,
  },
  {
    id: 2,
    name: "Eletrocardiograma",
    date: "Solicitado em 10 Abr",
    icon: "🫀",
    available: false,
  },
  {
    id: 3,
    name: "Raio-X Tórax",
    date: "Agendado para 20 Abr",
    icon: "🫁",
    available: false,
  },
];

const QUICK_ACTIONS = [
  { id: "schedule", label: "Agendar", icon: "📅", color: "#E6F1FB" },
  { id: "appointments", label: "Consultas", icon: "📋", color: "#EAF3DE" },
  { id: "exams", label: "Exames", icon: "🧪", color: "#FAEEDA" },
  { id: "prescriptions", label: "Receitas", icon: "💊", color: "#EEEDFE" },
];

// ─── Utilitários ─────────────────────────────────────────────────────────────
function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Bom dia";
  if (h < 18) return "Boa tarde";
  return "Boa noite";
}

function getFirstName(fullName) {
  return fullName.split(" ")[0];
}

// ─── Sub-componentes ──────────────────────────────────────────────────────────

function Avatar({
  initials,
  size = 40,
  bgColor = "#1A5C8A",
  textColor = "#fff",
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: bgColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.35,
        fontWeight: 500,
        color: textColor,
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}

function StatusBadge({ status }) {
  const config = {
    done: { label: "Realizada", bg: "#EAF3DE", color: "#3B6D11" },
    pending: { label: "Pendente", bg: "#FAEEDA", color: "#854F0B" },
    cancelled: { label: "Cancelada", bg: "#FCEBEB", color: "#A32D2D" },
  };
  const c = config[status] || config.pending;
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 8px",
        borderRadius: 20,
        fontSize: 10,
        fontWeight: 500,
        backgroundColor: c.bg,
        color: c.color,
        marginTop: 4,
      }}
    >
      {c.label}
    </span>
  );
}

// ─── Header ──────────────────────────────────────────────────────────────────
function Header({ user, nextAppointment }) {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #1A5C8A 0%, #0e4168 100%)",
        padding: "20px 16px 18px",
        color: "#fff",
      }}
    >
      {/* Topo: saudação + avatar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <div>
          <p style={{ fontSize: 12, opacity: 0.75, margin: 0 }}>
            {getGreeting()},
          </p>
          <p style={{ fontSize: 18, fontWeight: 500, margin: "2px 0 0" }}>
            {getFirstName(user.name)} 👋
          </p>
        </div>
        <div style={{ position: "relative" }}>
          <Avatar
            initials={user.initials}
            size={42}
            bgColor="rgba(255,255,255,0.25)"
            textColor="#fff"
          />
          {/* ponto de notificação */}
          <div
            style={{
              position: "absolute",
              top: 1,
              right: 1,
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "#F59E0B",
              border: "2px solid #1A5C8A",
            }}
          />
        </div>
      </div>

      {/* Card próxima consulta */}
      {nextAppointment && (
        <div
          style={{
            background: "rgba(255,255,255,0.15)",
            borderRadius: 14,
            padding: "12px 14px",
            border: "0.5px solid rgba(255,255,255,0.2)",
            cursor: "pointer",
          }}
        >
          <p
            style={{
              fontSize: 10,
              opacity: 0.7,
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              margin: "0 0 8px",
            }}
          >
            Próxima consulta
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <p style={{ fontSize: 15, fontWeight: 500, margin: 0 }}>
                {nextAppointment.doctor}
              </p>
              <p style={{ fontSize: 12, opacity: 0.8, margin: "3px 0 0" }}>
                {nextAppointment.specialty} · {nextAppointment.time}
              </p>
              <p style={{ fontSize: 11, opacity: 0.65, margin: "2px 0 0" }}>
                📍 {nextAppointment.location}
              </p>
            </div>
            <div
              style={{
                background: "rgba(255,255,255,0.2)",
                borderRadius: 10,
                padding: "8px 12px",
                textAlign: "center",
                minWidth: 52,
              }}
            >
              <p
                style={{
                  fontSize: 22,
                  fontWeight: 600,
                  margin: 0,
                  lineHeight: 1,
                }}
              >
                {nextAppointment.day}
              </p>
              <p
                style={{
                  fontSize: 10,
                  opacity: 0.8,
                  margin: "2px 0 0",
                  textTransform: "uppercase",
                }}
              >
                {nextAppointment.month}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Alerta / Notificação ─────────────────────────────────────────────────────
function AlertBanner({ message, onDismiss }) {
  return (
    <div
      style={{
        background: "#FAEEDA",
        border: "0.5px solid #FAC775",
        borderRadius: 10,
        padding: "10px 12px",
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "#BA7517",
          flexShrink: 0,
        }}
      />
      <p
        style={{
          fontSize: 12,
          color: "#633806",
          lineHeight: 1.5,
          margin: 0,
          flex: 1,
        }}
      >
        {message}
      </p>
      {onDismiss && (
        <button
          onClick={onDismiss}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#854F0B",
            fontSize: 16,
            padding: 0,
            lineHeight: 1,
          }}
        >
          ×
        </button>
      )}
    </div>
  );
}

// ─── Ações rápidas ────────────────────────────────────────────────────────────
function QuickActions({ actions, onActionPress }) {
  return (
    <div>
      <p style={styles.sectionTitle}>Ações rápidas</p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 8,
        }}
      >
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => onActionPress && onActionPress(action)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              padding: "10px 4px 8px",
              background: "#fff",
              borderRadius: 10,
              border: "0.5px solid #e5e7eb",
              cursor: "pointer",
              transition: "transform 0.1s, box-shadow 0.1s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                backgroundColor: action.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
              }}
            >
              {action.icon}
            </div>
            <span
              style={{
                fontSize: 10,
                color: "#6b7280",
                textAlign: "center",
                lineHeight: 1.3,
              }}
            >
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Lista de consultas ───────────────────────────────────────────────────────
function AppointmentList({ appointments, onItemPress }) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <p style={{ ...styles.sectionTitle, margin: 0 }}>Consultas recentes</p>
        <button style={styles.linkButton}>Ver todas</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {appointments.map((appt) => (
          <div
            key={appt.id}
            onClick={() => onItemPress && onItemPress(appt)}
            style={{
              background: "#fff",
              borderRadius: 10,
              border: "0.5px solid #e5e7eb",
              padding: "12px",
              display: "flex",
              alignItems: "center",
              gap: 12,
              cursor: "pointer",
              transition: "border-color 0.15s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = "#9ca3af")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "#e5e7eb")
            }
          >
            <Avatar
              initials={appt.initials}
              size={42}
              bgColor={appt.bg}
              textColor={appt.color}
            />
            <div style={{ flex: 1 }}>
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  margin: 0,
                  color: "#111827",
                }}
              >
                {appt.doctor}
              </p>
              <p style={{ fontSize: 11, color: "#6b7280", margin: "2px 0 0" }}>
                {appt.specialty}
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: 11, color: "#6b7280", margin: 0 }}>
                {appt.date}
              </p>
              <StatusBadge status={appt.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Lista de exames ──────────────────────────────────────────────────────────
function ExamList({ exams, onItemPress }) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <p style={{ ...styles.sectionTitle, margin: 0 }}>Últimos exames</p>
        <button style={styles.linkButton}>Ver todos</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {exams.map((exam) => (
          <div
            key={exam.id}
            onClick={() => onItemPress && onItemPress(exam)}
            style={{
              background: "#fff",
              borderRadius: 10,
              border: "0.5px solid #e5e7eb",
              padding: "11px 12px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              cursor: "pointer",
              transition: "border-color 0.15s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = "#9ca3af")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "#e5e7eb")
            }
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                backgroundColor: "#FAEEDA",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                flexShrink: 0,
              }}
            >
              {exam.icon}
            </div>
            <div style={{ flex: 1 }}>
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  margin: 0,
                  color: "#111827",
                }}
              >
                {exam.name}
              </p>
              <p style={{ fontSize: 11, color: "#6b7280", margin: "2px 0 0" }}>
                {exam.date}
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {exam.available && (
                <span
                  style={{
                    fontSize: 10,
                    background: "#EAF3DE",
                    color: "#3B6D11",
                    padding: "2px 7px",
                    borderRadius: 20,
                    fontWeight: 500,
                  }}
                >
                  Disponível
                </span>
              )}
              <span style={{ color: "#9ca3af", fontSize: 16 }}>›</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Bottom Navigation ────────────────────────────────────────────────────────
function BottomNav({ activeTab, onTabChange }) {
  const tabs = [
    { id: "home", label: "Início", icon: "🏠" },
    { id: "schedule", label: "Agenda", icon: "📅" },
    { id: "messages", label: "Mensagens", icon: "💬" },
    { id: "profile", label: "Perfil", icon: "👤" },
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        padding: "10px 0 14px",
        borderTop: "0.5px solid #e5e7eb",
        background: "#fff",
      }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange && onTabChange(tab.id)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              padding: "4px 16px",
              background: "none",
              border: "none",
              cursor: "pointer",
              borderRadius: 8,
            }}
          >
            <span style={{ fontSize: 20 }}>{tab.icon}</span>
            <span
              style={{
                fontSize: 9,
                fontWeight: 500,
                color: isActive ? "#1A5C8A" : "#9ca3af",
              }}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ─── Estilos compartilhados ───────────────────────────────────────────────────
const styles = {
  sectionTitle: {
    fontSize: 13,
    fontWeight: 500,
    color: "#6b7280",
    margin: "0 0 10px",
  },
  linkButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: 12,
    color: "#1A5C8A",
    fontWeight: 500,
    padding: 0,
  },
};

// ─── HomeScreen principal ─────────────────────────────────────────────────────
export default function HomeScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("home");
  const [alertVisible, setAlertVisible] = useState(true);

  // Handlers de navegação (adaptar conforme React Navigation)
  const handleAction = (action) => {
    // navigation.navigate(action.id);
    console.log("Ação:", action.id);
  };

  const handleAppointmentPress = (appt) => {
    // navigation.navigate("AppointmentDetail", { id: appt.id });
    console.log("Consulta selecionada:", appt.id);
  };

  const handleExamPress = (exam) => {
    // navigation.navigate("ExamDetail", { id: exam.id });
    console.log("Exame selecionado:", exam.id);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // navigation.navigate(tab);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "#f9fafb",
        fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
        maxWidth: 480,
        margin: "0 auto",
        overflow: "hidden",
      }}
    >
      {/* Header fixo */}
      <Header user={USER} nextAppointment={NEXT_APPOINTMENT} />

      {/* Conteúdo com scroll */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {/* Banner de alerta (condicional) */}
        {alertVisible && (
          <AlertBanner
            message="Resultado do hemograma disponível para visualização."
            onDismiss={() => setAlertVisible(false)}
          />
        )}

        {/* Ações rápidas */}
        <QuickActions actions={QUICK_ACTIONS} onActionPress={handleAction} />

        {/* Consultas recentes */}
        <AppointmentList
          appointments={APPOINTMENTS}
          onItemPress={handleAppointmentPress}
        />

        {/* Últimos exames */}
        <ExamList exams={EXAMS} onItemPress={handleExamPress} />

        {/* Espaço para não cobrir com o nav */}
        <div style={{ height: 8 }} />
      </div>

      {/* Bottom Nav fixo */}
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}
