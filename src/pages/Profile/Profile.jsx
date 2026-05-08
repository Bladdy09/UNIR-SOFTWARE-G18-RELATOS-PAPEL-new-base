import React, { useContext } from "react";
import "./Profile.css";
import { AuthContext } from "../../context/auth/AuthContext.jsx";
import { useLogin } from "../../hooks/useLogin.js";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const { logout } = useLogin();

  if (!user) {
    return null;
  }

  const recentOrders = user.recentOrders.slice(0, 5);
  const totalOrders = user.recentOrders.length;
  const totalBooks = user.recentOrders.reduce(
    (sum, order) => sum + order.items.reduce((acc, item) => acc + item.quantity, 0),
    0
  );
  const totalSpent = user.recentOrders.reduce((sum, order) => sum + order.total, 0);

  const getStatusClass = (status) => {
    switch (status) {
      case "entregado":
        return "status-completed";
      case "en_proceso":
        return "status-processing";
      case "pendiente":
        return "status-pending";
      default:
        return "status-default";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "entregado":
        return "Completado";
      case "en_proceso":
        return "En proceso";
      case "pendiente":
        return "Pendiente";
      default:
        return status;
    }
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });

  const formatPrice = (price) =>
    new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR"
    }).format(price);

  return (
    <div className="profile-page">
      <h1 className="profile-title">Mi Perfil</h1>

      <div className="profile-layout">
        <aside className="profile-sidebar">
          <section className="profile-card">
            <div className="profile-user">
              <div className="avatar">
                <i className="bi bi-person"></i>
              </div>
              <div>
                <h2>{user.company.name}</h2>
                <span>{user.company.sector}</span>
              </div>
            </div>

            <div className="profile-info">
              <div className="info-row">
                <i className="bi bi-envelope"></i>
                <div>
                  <small>Email</small>
                  <p>{user.company.email}</p>
                </div>
              </div>
              <div className="info-row">
                <i className="bi bi-telephone"></i>
                <div>
                  <small>Teléfono</small>
                  <p>{user.company.phone}</p>
                </div>
              </div>
              <div className="info-row">
                <i className="bi bi-geo-alt"></i>
                <div>
                  <small>Dirección</small>
                  <p>{user.company.address}</p>
                </div>
              </div>
            </div>

            <div className="profile-actions">
              <button type="button" className="outline-btn">
                <i className="bi bi-truck"></i>
                Seguimiento de Pedidos
              </button>
              <button type="button" className="outline-btn">
                <i className="bi bi-chat-dots"></i>
                Soporte
              </button>
              <button type="button" className="outline-btn">
                <i className="bi bi-gear"></i>
                Configuración
              </button>
              <button type="button" className="primary-btn">
                Ir al Catálogo
              </button>
              <button type="button" className="secondary-btn" onClick={logout}>
                Cerrar Sesión
              </button>
            </div>
          </section>

          <section className="stats-card">
            <h3>Estadísticas</h3>
            <div className="stat-row">
              <span>Total de pedidos</span>
              <strong>{totalOrders}</strong>
            </div>
            <div className="stat-row">
              <span>Libros comprados</span>
              <strong>{totalBooks}</strong>
            </div>
            <div className="stat-row">
              <span>Total gastado</span>
              <strong>{formatPrice(totalSpent)}</strong>
            </div>
          </section>
        </aside>

        <section className="profile-orders">
          <div className="orders-header">
            <i className="bi bi-box"></i>
            <h2>Últimos 5 Pedidos</h2>
          </div>

          <div className="orders-list">
            {recentOrders.length === 0 ? (
              <div className="empty-orders">No hay pedidos recientes</div>
            ) : (
              recentOrders.map((order, index) => (
                <article key={order.id} className="order-card">
                  <div className="order-card-header">
                    <div className="order-icon">
                      <i className="bi bi-box-seam"></i>
                    </div>
                    <div className="order-details">
                      <h4>Pedido #{String(index + 1).padStart(3, "0")}</h4>
                      <span>
                        <i className="bi bi-calendar"></i>
                        {formatDate(order.date)}
                      </span>
                    </div>
                    <div className="order-meta">
                      <span className={`status-pill ${getStatusClass(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                      <strong>{formatPrice(order.total)}</strong>
                    </div>
                  </div>

                  <div className="order-items">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="order-item">
                        <div>
                          <p className="item-title">{item.name}</p>
                          <span className="item-author">{item.author || ""}</span>
                        </div>
                        <div className="item-qty">{item.quantity} x {formatPrice(item.price)}</div>
                      </div>
                    ))}
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
