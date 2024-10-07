'use client'

import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import scheduleJSON from '../schedule.json'
import {myTeams} from '../page.js'


// Filters schedule to only include games from the selected teams
const updateSchedule = (scheduleJSON, games) => {
    scheduleJSON.leagueSchedule.gameDates.forEach((gameDate) => {
        gameDate.games.forEach((game) => {
            myTeams.forEach((team) => {
                if (team == game.homeTeam.teamCity + ' ' + game.homeTeam.teamName || team == game.awayTeam.teamCity + ' ' + game.awayTeam.teamName) {
                    games.push({
                        'title': game.awayTeam.teamCity + ' ' + game.awayTeam.teamName + ' @ ' + game.homeTeam.teamCity + ' ' + game.homeTeam.teamName,
                        'start': game.gameDateTimeEst
                })
                }
            })
        })
    })
}



export default class DemoApp extends React.Component {
    render() {
    const games = []
    updateSchedule(scheduleJSON, games);
    return (
        <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin ]}
        initialView="dayGridMonth"
        events={games}
        eventClick = {this.handleEventClick}
        dateClick = {this.handleDateClick}
        />
        )
    }
    handleDateClick = (arg) => { // bind with an arrow function
        alert(arg.dateStr)
    }
    handleEventClick = (arg) => {
        alert(arg.event.title)
    }
}