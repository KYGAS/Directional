module.exports = function Directional(dispatch) {
	const command = dispatch.command;
	let curW = 0;
	let myGid = 0;
	let enabled = false;
	
	command.add('directional', () => {
		enabled = !enabled;
		command.message('Directional is now: ' + (enabled ? 'Enabled.' : 'Disabled.'));
	});
		
		dispatch.hook('S_LOGIN', 13, (event) => {
			myGid = event.gameId;
		});
		
		dispatch.hook('C_PLAYER_LOCATION', 5, (event) => {
			curW=event.w;
		});
		
		dispatch.hook('C_NOTIFY_LOCATION_IN_ACTION', 4, (event) => {
			curW=event.w;
		});
		
		dispatch.hook('C_NOTIFY_LOCATION_IN_DASH', 4, (event) => {
			curW=event.w;
		});
		
		dispatch.hook('S_USER_LOCATION', 5, (event) => {
			if(event.gameId == myGid) curW=event.w;
		});
		
		dispatch.hook('S_USER_LOCATION_IN_ACTION', 2, (event) => {
			if(event.gameId == myGid) curW=event.w;
		});
	
		dispatch.hook('C_START_TARGETED_SKILL', 6, (event) => {
		if(enabled)
			{
					if(event.skill.id == 41000)
					{
							event.w = curW;
							event.dest.x = event.loc.x + 440 * Math.cos(event.w);
							event.dest.y = event.loc.y + 440 * Math.sin(event.w);
							event.dest.z = event.loc.z + 20;
							return true;
					}
					else curW = event.w;
			}
		});
		
		dispatch.hook('C_START_SKILL', 7, (event) => {
		if(enabled)
			{
					if(event.skill.id == 41011)
					{
						event.w = curW;
					}
					else curW = event.w;
			}
		});
}