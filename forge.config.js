module.exports = {
	packagerConfig: {
		icon: "./public/icon"
	},
	rebuildConfig: {},
	makers: [
		{
			name: '@electron-forge/maker-squirrel',
			config: {
				iconUrl: "./public/icon.ico",
				setupIcon: "./public/icon.ico",
			},
		},
		{
			name: '@electron-forge/maker-zip',
			platforms: ['darwin'],
		},
		{
			name: '@electron-forge/maker-deb',
			config: {
				options: {
					icon: "./public/icon.png"
				}
			},
		}
	],
};
