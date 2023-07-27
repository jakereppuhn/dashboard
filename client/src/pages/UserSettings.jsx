import { useState } from 'react';
import { Layout } from '../components';

function UserSettings() {
	const [settings, setSettings] = useState({
		setting1: false,
		setting2: 0,
		setting3: '',
		setting4: false,
		setting5: 0,
		setting6: '',
		setting7: false,
		setting8: 0,
		setting9: '',
		setting10: false,
	});

	const handleCheckboxChange = (setting) => {
		setSettings({
			...settings,
			[setting]: !settings[setting],
		});
	};

	const handleInputChange = (e) => {
		setSettings({
			...settings,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<Layout>
			<h1 className="text-3xl font-bold text-gray-900">User Settings</h1>

			<form className="mt-8 space-y-6">
				<div className="rounded-md shadow-sm -space-y-px">
					<label>
						Setting 1:
						<input
							type="checkbox"
							name="setting1"
							checked={settings.setting1}
							onChange={() => handleCheckboxChange('setting1')}
						/>
					</label>
					<label>
						Setting 2:
						<input
							type="number"
							name="setting2"
							value={settings.setting2}
							onChange={handleInputChange}
						/>
					</label>
					<label>
						Setting 3:
						<select
							name="setting3"
							value={settings.setting3}
							onChange={handleInputChange}>
							<option value="">--Please choose an option--</option>
							<option value="option1">Option 1</option>
							<option value="option2">Option 2</option>
						</select>
					</label>
					{/* Repeat for settings 4-10 */}
				</div>
				<div>
					<button
						type="submit"
						className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
						Save Settings
					</button>
				</div>
			</form>
		</Layout>
	);
}

export default UserSettings;
