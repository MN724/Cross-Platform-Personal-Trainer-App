'use client'

import React from 'react';
import {DualListSelector} from '@patternfly/react-core';

// List of NBA teams
let teams = [
  'Atlanta Hawks',
  'Boston Celtics',
  'Brooklyn Nets',
  'Charlotte Hornets',
  'Chicago Bulls',
  'Cleveland Cavaliers',
  'Dallas Mavericks',
  'Denver Nuggets',
  'Detroit Pistons',
  'Golden State Warriors',
  'Houston Rockets',
  'Indiana Pacers',
  'LA Clippers',
  'Los Angeles Lakers',
  'Memphis Grizzlies',
  'Miami Heat',
  'Milwaukee Bucks',
  'Minnesota Timberwolves',
  'New Orleans Pelicans',
  'New York Knicks',
  'Oklahoma City Thunder',
  'Orlando Magic',
  'Philadelphia 76ers',
  'Phoenix Suns',
  'Portland Trail Blazers',
  'Sacramento Kings',
  'San Antonio Spurs',
  'Toronto Raptors',
  'Utah Jazz',
  'Washington Wizards'
];

let myTeams = []

// Displays list of teams and allows user to select teams
export default function DualListSelectorBasic() {
  const [availableOptions, setAvailableOptions] = React.useState(teams);
  const [chosenOptions, setChosenOptions] = React.useState(myTeams);
  const onListChange = (event, newAvailableOptions, newChosenOptions) => {
    setAvailableOptions(newAvailableOptions.sort());
    setChosenOptions(newChosenOptions.sort());
    teams = newAvailableOptions
    myTeams = newChosenOptions
  };
  return (
    <>
      <h1 className='home-header'>Choose Your NBA Teams Below:</h1>
      <h2>Select NBA teams in the left pane and use the arrow controls in the center pane to move the selected teams (single arrow) or all teams (double arrow).</h2>
      <DualListSelector availableOptions={availableOptions} chosenOptions={chosenOptions} onListChange={onListChange} id="dual-list-selector-basic" />
      <h1>Navigate over to the Calendar or List to see the your teams's game schedule.</h1>
    </>
  )
};

export {myTeams};