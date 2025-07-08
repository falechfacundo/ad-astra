import { useState, useEffect } from "react";
import Layout from "../components/layout/Layout.jsx";

const WORKER_URL = "https://ad-astra-newsletter-worker.faiafacundo.workers.dev";

export default function Emails() {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    fetch(WORKER_URL)
      .then((response) => response.text())
      .then((data) => {
        const emailList = data.split(",");
        setEmails(emailList);
      })
      .catch((error) => console.error("Error fetching the email list:", error));
  }, []);

  return (
    <Layout>
      <div className="mt-4 grid grid-cols-12 items-start min-h-screen py-24 bg-electric-violet-100/90 col-span-full">
        {emails.length > 0 ? (
          <table className="col-start-5 col-end-9 table-auto border-collapse border border-gray-400">
            <thead>
              <tr>
                <th className="border border-black/60 bg-electric-violet-300 px-4 py-2">
                  Emails
                </th>
              </tr>
            </thead>
            <tbody>
              {emails.map((email, index) => (
                <tr key={index}>
                  <td className="border border-black/60 bg-electric-violet-200 px-4 py-2">
                    {email.trim()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-xl">Fetching...</p>
        )}
      </div>
    </Layout>
  );
}
