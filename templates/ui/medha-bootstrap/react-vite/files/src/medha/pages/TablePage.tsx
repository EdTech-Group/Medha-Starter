// Ported from the Medha theme by medha-starter. Source: table.html. Regenerated from the theme; build new screens from these components.
import { AppShell } from "../../components/medha/AppShell";

export default function TablePage() {
  return (
    <AppShell title="Tables" documentTitle="Tables • Medha IoT">
      <section className="page-heading">
        <div>
          <div className="eyebrow">FORMS &amp; DATA</div>
          <h1>Tables</h1>
          <p>Basic, striped, bordered and coloured-row tables.</p>
        </div>
        <div className="heading-actions" />
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Basic table</h2>
            <p>Sample gateways</p>
          </div>
        </div>
        <div className="">
          <div className="table-responsive">
            <table className="table align-middle ">
              <thead>
                <tr>
                  <th>GATEWAY</th>
                  <th>SITE</th>
                  <th>STATUS</th>
                  <th>POWER</th>
                  <th>LAST SYNC</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Ahmedabad GW-01</td>
                  <td>Ahmedabad</td>
                  <td>
                    <span className="status-badge status-Online">Online</span>
                  </td>
                  <td className="power">12.4 kW</td>
                  <td>2 min ago</td>
                </tr>
                <tr>
                  <td>Ahmedabad GW-02</td>
                  <td>Ahmedabad</td>
                  <td>
                    <span className="status-badge status-Online">Online</span>
                  </td>
                  <td className="power">9.8 kW</td>
                  <td>3 min ago</td>
                </tr>
                <tr>
                  <td>Vadodara GW-01</td>
                  <td>Vadodara</td>
                  <td>
                    <span className="status-badge status-Warning">Warning</span>
                  </td>
                  <td className="power">4.1 kW</td>
                  <td>18 min ago</td>
                </tr>
                <tr>
                  <td>Vadodara GW-02</td>
                  <td>Vadodara</td>
                  <td>
                    <span className="status-badge status-Online">Online</span>
                  </td>
                  <td className="power">11.0 kW</td>
                  <td>1 min ago</td>
                </tr>
                <tr>
                  <td>Surat GW-01</td>
                  <td>Surat</td>
                  <td>
                    <span className="status-badge status-Offline">Offline</span>
                  </td>
                  <td className="power">0.0 kW</td>
                  <td>5 h ago</td>
                </tr>
                <tr>
                  <td>Surat GW-02</td>
                  <td>Surat</td>
                  <td>
                    <span className="status-badge status-Online">Online</span>
                  </td>
                  <td className="power">8.7 kW</td>
                  <td>4 min ago</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Striped &amp; hover</h2>
            <p />
          </div>
        </div>
        <div className="">
          <div className="table-responsive">
            <table className="table align-middle table-striped table-hover">
              <thead>
                <tr>
                  <th>GATEWAY</th>
                  <th>SITE</th>
                  <th>STATUS</th>
                  <th>POWER</th>
                  <th>LAST SYNC</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Ahmedabad GW-01</td>
                  <td>Ahmedabad</td>
                  <td>
                    <span className="status-badge status-Online">Online</span>
                  </td>
                  <td className="power">12.4 kW</td>
                  <td>2 min ago</td>
                </tr>
                <tr>
                  <td>Ahmedabad GW-02</td>
                  <td>Ahmedabad</td>
                  <td>
                    <span className="status-badge status-Online">Online</span>
                  </td>
                  <td className="power">9.8 kW</td>
                  <td>3 min ago</td>
                </tr>
                <tr>
                  <td>Vadodara GW-01</td>
                  <td>Vadodara</td>
                  <td>
                    <span className="status-badge status-Warning">Warning</span>
                  </td>
                  <td className="power">4.1 kW</td>
                  <td>18 min ago</td>
                </tr>
                <tr>
                  <td>Vadodara GW-02</td>
                  <td>Vadodara</td>
                  <td>
                    <span className="status-badge status-Online">Online</span>
                  </td>
                  <td className="power">11.0 kW</td>
                  <td>1 min ago</td>
                </tr>
                <tr>
                  <td>Surat GW-01</td>
                  <td>Surat</td>
                  <td>
                    <span className="status-badge status-Offline">Offline</span>
                  </td>
                  <td className="power">0.0 kW</td>
                  <td>5 h ago</td>
                </tr>
                <tr>
                  <td>Surat GW-02</td>
                  <td>Surat</td>
                  <td>
                    <span className="status-badge status-Online">Online</span>
                  </td>
                  <td className="power">8.7 kW</td>
                  <td>4 min ago</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Bordered</h2>
            <p />
          </div>
        </div>
        <div className="">
          <div className="table-responsive">
            <table className="table align-middle table-bordered">
              <thead>
                <tr>
                  <th>GATEWAY</th>
                  <th>SITE</th>
                  <th>STATUS</th>
                  <th>POWER</th>
                  <th>LAST SYNC</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Ahmedabad GW-01</td>
                  <td>Ahmedabad</td>
                  <td>
                    <span className="status-badge status-Online">Online</span>
                  </td>
                  <td className="power">12.4 kW</td>
                  <td>2 min ago</td>
                </tr>
                <tr>
                  <td>Ahmedabad GW-02</td>
                  <td>Ahmedabad</td>
                  <td>
                    <span className="status-badge status-Online">Online</span>
                  </td>
                  <td className="power">9.8 kW</td>
                  <td>3 min ago</td>
                </tr>
                <tr>
                  <td>Vadodara GW-01</td>
                  <td>Vadodara</td>
                  <td>
                    <span className="status-badge status-Warning">Warning</span>
                  </td>
                  <td className="power">4.1 kW</td>
                  <td>18 min ago</td>
                </tr>
                <tr>
                  <td>Vadodara GW-02</td>
                  <td>Vadodara</td>
                  <td>
                    <span className="status-badge status-Online">Online</span>
                  </td>
                  <td className="power">11.0 kW</td>
                  <td>1 min ago</td>
                </tr>
                <tr>
                  <td>Surat GW-01</td>
                  <td>Surat</td>
                  <td>
                    <span className="status-badge status-Offline">Offline</span>
                  </td>
                  <td className="power">0.0 kW</td>
                  <td>5 h ago</td>
                </tr>
                <tr>
                  <td>Surat GW-02</td>
                  <td>Surat</td>
                  <td>
                    <span className="status-badge status-Online">Online</span>
                  </td>
                  <td className="power">8.7 kW</td>
                  <td>4 min ago</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Coloured rows</h2>
            <p>Contextual row classes</p>
          </div>
        </div>
        <div className="">
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead>
                <tr>
                  <th>GATEWAY</th>
                  <th>SITE</th>
                  <th>CLASS</th>
                  <th>POWER</th>
                  <th>LAST SYNC</th>
                </tr>
              </thead>
              <tbody>
                <tr className="table-primary">
                  <td>Ahmedabad GW-01</td>
                  <td>Ahmedabad</td>
                  <td>Primary</td>
                  <td className="power">12.4 kW</td>
                  <td>2 min ago</td>
                </tr>
                <tr className="table-success">
                  <td>Ahmedabad GW-02</td>
                  <td>Ahmedabad</td>
                  <td>Success</td>
                  <td className="power">9.8 kW</td>
                  <td>3 min ago</td>
                </tr>
                <tr className="table-warning">
                  <td>Vadodara GW-01</td>
                  <td>Vadodara</td>
                  <td>Warning</td>
                  <td className="power">4.1 kW</td>
                  <td>18 min ago</td>
                </tr>
                <tr className="table-danger">
                  <td>Vadodara GW-02</td>
                  <td>Vadodara</td>
                  <td>Danger</td>
                  <td className="power">11.0 kW</td>
                  <td>1 min ago</td>
                </tr>
                <tr className="table-info">
                  <td>Surat GW-01</td>
                  <td>Surat</td>
                  <td>Info</td>
                  <td className="power">0.0 kW</td>
                  <td>5 h ago</td>
                </tr>
                <tr className="table-secondary">
                  <td>Surat GW-02</td>
                  <td>Surat</td>
                  <td>Secondary</td>
                  <td className="power">8.7 kW</td>
                  <td>4 min ago</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
