const QUERY_ALL_CLIENTS = `

        SELECT * FROM cc_clients AS c
        JOIN cc_users AS u
        ON c.user_id = u.user_id
        WHERE c.user_id = u.user_id
        `
const QUERY_PEND_APPTS = `
        SELECT * from cc_appointments
        WHERE approved = false
        ORDER BY date DESC;
        `
const QUERY_PAST_APPTS = `
SELECT a.appt_id, a.date, a.service_type, a.approved, a.completed, u.first_name, u.last_name 
        FROM cc_appointments AS a
        JOIN cc_emp_appts AS ea ON a.appt_id = ea.appt_id
        JOIN cc_employees AS e ON e.emp_id = ea.emp_id
        JOIN cc_users u ON e.user_id = u.user_id
        WHERE a.approved = true AND a.completed = true
        ORDER BY a.date DESC;
`
const QUERY_UPCOMING_APPTS = `
SELECT a.appt_id, a.date, a.service_type, a.approved, a.completed, u.first_name, u.last_name 
        FROM cc_appointments AS a
        JOIN cc_emp_appts AS ea ON a.appt_id = ea.appt_id
        JOIN cc_employees AS e ON e.emp_id = ea.emp_id
        JOIN cc_users AS u ON e.user_id = u.user_id
        WHERE a.approved = true AND a.completed = false
        ORDER BY a.date DESC;
`
const UPDATE_APPROVE_APPTS = `
UPDATE cc_appointments
        SET approved = true
        WHERE appt_id = ?;

        INSERT INTO cc_emp_appts (emp_id, appt_id)
        VALUES (?, ?),
        (?, ?);
        
`
const UPDATE_COMPLETE_APPTS = `
UPDATE cc_appointments
SET completed = true
WHERE appt_id = ?;

`
module.exports = {
  QUERY_ALL_CLIENTS,
  QUERY_PEND_APPTS,
  QUERY_PAST_APPTS,
  QUERY_UPCOMING_APPTS,
  UPDATE_APPROVE_APPTS,
  UPDATE_COMPLETE_APPTS
}
