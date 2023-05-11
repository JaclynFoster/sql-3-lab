const Sequelize = require('sequelize')
const {
  QUERY_ALL_CLIENTS,
  QUERY_PEND_APPTS,
  QUERY_PAST_APPTS,
  QUERY_UPCOMING_APPTS,
  UPDATE_APPROVE_APPTS,
  UPDATE_COMPLETE_APPTS
} = require('./CONST')
const { CONNECTION_STRING } = process.env

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false
    }
  }
})

let nextEmp = 5

module.exports = {
  getAllClients: (req, res) => {
    sequelize
      .query(QUERY_ALL_CLIENTS)
      .then(dbRes => {
        res.status(200).send(dbRes[0])
      })
      .catch(error => {
        console.log(error)
      })
  },

  getPendingAppointments: (req, res) => {
    sequelize
      .query(QUERY_PEND_APPTS)
      .then(dbRes => {
        res.status(200).send(dbRes[0])
      })
      .catch(error => {
        console.log(error)
      })
  },
  getPastAppointments: (req, res) => {
    sequelize
      .query(QUERY_PAST_APPTS)
      .then(dbRes => {
        res.status(200).send(dbRes[0])
      })
      .catch(error => {
        console.log(error)
      })
  },
  getUpcomingAppointments: (req, res) => {
    sequelize
      .query(QUERY_UPCOMING_APPTS)
      .then(dbRes => res.status(200).send(dbRes[0]))
      .catch(err => console.log(err))
  },

  approveAppointment: (req, res) => {
    let { apptId } = req.body
    sequelize
      .query(UPDATE_APPROVE_APPTS, {
        replacements: [apptId, nextEmp, apptId, nextEmp + 1, apptId]
      })
      .then(dbRes => {
        res.status(200).send(dbRes[0])
        nextEmp += 2
      })
      .catch(err => console.log(err))
  },
  completeAppointment: (req, res) => {
    let { apptId } = req.body
    sequelize
      .query(UPDATE_COMPLETE_APPTS, {
        replacements: [apptId]
      })
      .then(dbRes => {
        res.status(200).send(dbRes[0])
      })
      .catch(error => {
        console.log(error)
      })
  }
}
