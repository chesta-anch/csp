import React from "react";

function SuggestedServers({ topThreeServers }) {
  const servers = topThreeServers.topThreeCloudServices;

  return (
    <div className="suggested-servers">
      {servers.length > 0 ? (
        servers.map((server, index) => (
          <div className="server-card" key={index}>
            <h2>{server.serviceName}</h2>
            <p>Score: {server.score}</p>
            <p>Cloud Type: {server.cloudType}</p>
            <p>Data Security Features: {server.dataSecurityFeatures}</p>
            <p>Yearly Budget: {server.yearlyBudget}</p>
            {/* Render more details if needed */}
          </div>
        ))
      ) : (
        <p>No suggested servers available</p>
      )}
    </div>
  );
}

export default SuggestedServers;
