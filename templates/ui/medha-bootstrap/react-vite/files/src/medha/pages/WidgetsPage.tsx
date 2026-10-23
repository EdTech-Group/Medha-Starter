// Ported from the Medha theme by medha-starter. Source: widgets.html. Regenerated from the theme; build new screens from these components.
import { AppShell } from "../../components/medha/AppShell";

export default function WidgetsPage() {
  return (
    <AppShell title="Widgets" documentTitle="Widgets • Medha IoT">
      <section className="page-heading">
        <div>
          <div className="eyebrow">COMPONENTS</div>
          <h1>Widgets</h1>
          <p>Report, contacts, activity timeline, progress table, mini calendar and stats.</p>
        </div>
        <div className="heading-actions" />
      </section>
      <div className="row g-3">
        <div className="col-xl-4">
          <section className="panel h-100 mb-4">
            <div className="panel-heading">
              <div>
                <h2>Report</h2>
                <p>Latest orders</p>
              </div>
            </div>
            <div className="">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>AMOUNT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>#24436</td>
                    <td>Maecenas molestie</td>
                    <td className="power">$2,100.00</td>
                  </tr>
                  <tr>
                    <td>#2118</td>
                    <td>Vivamus molestie</td>
                    <td className="power">$4,200.00</td>
                  </tr>
                  <tr>
                    <td>#6668</td>
                    <td>Donec at auctor</td>
                    <td className="power">$1,900.00</td>
                  </tr>
                  <tr>
                    <td>#8446</td>
                    <td>Nullam sollicitudin</td>
                    <td className="power">$4,300.00</td>
                  </tr>
                  <tr>
                    <td>#3279</td>
                    <td>Ullamcorper dictum</td>
                    <td className="power">$3,600.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
        <div className="col-xl-4">
          <section className="panel h-100 mb-4">
            <div className="panel-heading">
              <div>
                <h2>Contacts</h2>
                <p>Team directory</p>
              </div>
            </div>
            <div className="panel-body">
              <ul className="list-unstyled mb-0">
                <li className="d-flex align-items-center mb-3">
                  <span className="avatar ">AX</span>
                  <div className="ms-3">
                    <strong className="d-block">Alexander</strong>
                    <small className="text-muted">example@gmail.com</small>
                  </div>
                  <span className="badge bg-secondary ms-auto">CEO</span>
                </li>
                <li className="d-flex align-items-center mb-3">
                  <span className="avatar ">JJ</span>
                  <div className="ms-3">
                    <strong className="d-block">Jackson Jacob</strong>
                    <small className="text-muted">example@hotmail.com</small>
                  </div>
                  <span className="badge bg-secondary ms-auto">Director</span>
                </li>
                <li className="d-flex align-items-center mb-3">
                  <span className="avatar ">ML</span>
                  <div className="ms-3">
                    <strong className="d-block">Merina Lisa</strong>
                    <small className="text-muted">example1@gmail.com</small>
                  </div>
                  <span className="badge bg-secondary ms-auto">Manager</span>
                </li>
                <li className="d-flex align-items-center mb-3">
                  <span className="avatar ">MI</span>
                  <div className="ms-3">
                    <strong className="d-block">Michael</strong>
                    <small className="text-muted">example1@hotmail.com</small>
                  </div>
                  <span className="badge bg-secondary ms-auto">Assistant</span>
                </li>
              </ul>
            </div>
          </section>
        </div>
        <div className="col-xl-4">
          <section className="panel h-100 mb-4">
            <div className="panel-heading">
              <div>
                <h2>Activities</h2>
                <p>Recent events</p>
              </div>
            </div>
            <div className="panel-body">
              <ul className="timeline">
                <li>
                  <i />
                  <div>
                    <p>Alexander has just joined</p>
                    <small>0 mins ago</small>
                  </div>
                </li>
                <li>
                  <i />
                  <div>
                    <p>Michael has sent a request for access</p>
                    <small>15 minutes ago</small>
                  </div>
                </li>
                <li>
                  <i />
                  <div>
                    <p>Chris added you to his team</p>
                    <small>18 minutes ago</small>
                  </div>
                </li>
                <li>
                  <i />
                  <div>
                    <p>Jackson has finished his task</p>
                    <small>22 minutes ago</small>
                  </div>
                </li>
                <li>
                  <i />
                  <div>
                    <p>Jacob shared a folder with you</p>
                    <small>30 minutes ago</small>
                  </div>
                </li>
              </ul>
            </div>
          </section>
        </div>
        <div className="col-xl-8">
          <section className="panel h-100 mb-4">
            <div className="panel-heading">
              <div>
                <h2>Recent followers</h2>
                <p>Project progress</p>
              </div>
            </div>
            <div className="">
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>PROJECT</th>
                      <th>MANAGER</th>
                      <th>STATUS</th>
                      <th>PROGRESS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Gateway rollout</td>
                      <td>Alexander</td>
                      <td>
                        <span className="badge bg-warning">in progress</span>
                      </td>
                      <td style={{ minWidth: "120px" }}>
                        <div className="progress">
                          <div className="progress-bar" style={{ width: "70%" }} />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Solar audit</td>
                      <td>Lucika Adam</td>
                      <td>
                        <span className="badge bg-success">completed</span>
                      </td>
                      <td style={{ minWidth: "120px" }}>
                        <div className="progress">
                          <div className="progress-bar" style={{ width: "80%" }} />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Firmware 2.1</td>
                      <td>Michael</td>
                      <td>
                        <span className="badge bg-warning">in progress</span>
                      </td>
                      <td style={{ minWidth: "120px" }}>
                        <div className="progress">
                          <div className="progress-bar" style={{ width: "30%" }} />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Site survey</td>
                      <td>Chris Dany</td>
                      <td>
                        <span className="badge bg-warning">in progress</span>
                      </td>
                      <td style={{ minWidth: "120px" }}>
                        <div className="progress">
                          <div className="progress-bar" style={{ width: "55%" }} />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Data pipeline</td>
                      <td>Jacob Velly</td>
                      <td>
                        <span className="badge bg-warning">in progress</span>
                      </td>
                      <td style={{ minWidth: "120px" }}>
                        <div className="progress">
                          <div className="progress-bar" style={{ width: "75%" }} />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>Reporting</td>
                      <td>Donald Chris</td>
                      <td>
                        <span className="badge bg-warning">in progress</span>
                      </td>
                      <td style={{ minWidth: "120px" }}>
                        <div className="progress">
                          <div className="progress-bar" style={{ width: "25%" }} />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td>Training</td>
                      <td>Alexa Louis</td>
                      <td>
                        <span className="badge bg-warning">in progress</span>
                      </td>
                      <td style={{ minWidth: "120px" }}>
                        <div className="progress">
                          <div className="progress-bar" style={{ width: "100%" }} />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
        <div className="col-xl-4">
          <section className="panel h-100 mb-4">
            <div className="panel-heading">
              <div>
                <h2>Calendar widget</h2>
                <p>Compact month view</p>
              </div>
            </div>
            <div className="panel-body">
              <div id="mini-cal" className="mini-cal" />
            </div>
          </section>
        </div>
        <div className="col-xl-6">
          <section className="panel  mb-4">
            <div className="panel-heading">
              <div>
                <h2>Browser stats</h2>
                <p>Share by browser</p>
              </div>
            </div>
            <div className="panel-body">
              <div className="mb-3">
                <div className="d-flex justify-content-between small mb-1">
                  <span>Google Chrome</span>
                  <span>85%</span>
                </div>
                <div className="progress">
                  <div className="progress-bar" style={{ width: "85%" }} />
                </div>
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between small mb-1">
                  <span>Firefox</span>
                  <span>35%</span>
                </div>
                <div className="progress">
                  <div className="progress-bar" style={{ width: "35%" }} />
                </div>
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between small mb-1">
                  <span>Internet Explorer</span>
                  <span>78%</span>
                </div>
                <div className="progress">
                  <div className="progress-bar" style={{ width: "78%" }} />
                </div>
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between small mb-1">
                  <span>Safari</span>
                  <span>50%</span>
                </div>
                <div className="progress">
                  <div className="progress-bar" style={{ width: "50%" }} />
                </div>
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between small mb-1">
                  <span>Opera</span>
                  <span>80%</span>
                </div>
                <div className="progress">
                  <div className="progress-bar" style={{ width: "80%" }} />
                </div>
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between small mb-1">
                  <span>Microsoft Edge</span>
                  <span>78%</span>
                </div>
                <div className="progress">
                  <div className="progress-bar" style={{ width: "78%" }} />
                </div>
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between small mb-1">
                  <span>Others</span>
                  <span>60%</span>
                </div>
                <div className="progress">
                  <div className="progress-bar" style={{ width: "60%" }} />
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="col-xl-6">
          <section className="panel  mb-4">
            <div className="panel-heading">
              <div>
                <h2>About</h2>
                <p>Text card with social links</p>
              </div>
            </div>
            <div className="panel-body">
              <p className="mb-3">
                Fusce elit sem, dictum non gravida vitae, pulvinar ac mi. Proin aliquet ex nunc,
                sodales efficitur risus imperdiet et. Vestibulum ante ipsum primis in faucibus orci
                luctus et ultrices.
              </p>
              <div className="d-flex gap-2">
                <a className="btn btn-outline-secondary btn-sm" href="#">
                  Facebook
                </a>
                <a className="btn btn-outline-secondary btn-sm" href="#">
                  Twitter
                </a>
                <a className="btn btn-outline-secondary btn-sm" href="#">
                  Google
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
