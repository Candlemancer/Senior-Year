// Jonathan Petersen
// A01236750

TowerDefense.UIController = (function(cursor, towers, scores, levels) {

	var keyboard = TowerDefense.Input.Keyboard(),
		fakeBasicTower,
		fakeMissileTower,
		fakeGrenadeTower,
		fakeFreezingTower,
		selectedTowerType,
		towersSold,
		playBGM = true;


	var promptForKeyChange = function(element) {
		element.value = '';
		var keyPressed = keyboard.listenForNextKeypress(changeKeyCombo, element);
	}

	var changeKeyCombo = function(keyEvent, element) {
		if (keyEvent.shiftKey === true) {
			element.value += 'Shift + ';
		}
		if (keyEvent.altKey === true) {
			element.value += 'Alt + ';
		}
		if (keyEvent.ctrlKey === true) {
			element.value += 'Ctrl + ';
		}
		if (keyEvent.metaKey === true) {
			element.value += 'Meta + ';
		}
		// Chrome hacks
		if (keyEvent.key === undefined) {
			keyEvent.key = keyEvent.code.substring(keyEvent.code.length - 1);
		}
		element.value += keyEvent.key.toUpperCase();
		element.blur();

		if (element.name == 'upgradeField') {
			changeUpgradeKeyCombo({
				key: keyEvent.key.toUpperCase(),
				shiftKey: keyEvent.shiftKey,
				altKey: keyEvent.altKey,
				ctrlKey: keyEvent.ctrlKey,
				metaKey: keyEvent.metaKey
			});
		}
		if (element.name == 'sellField') {
			changeSellKeyCombo({
				key: keyEvent.key.toUpperCase(),
				shiftKey: keyEvent.shiftKey,
				altKey: keyEvent.altKey,
				ctrlKey: keyEvent.ctrlKey,
				metaKey: keyEvent.metaKey
			});
		}
		if (element.name == 'nextLevelField') {
			changeNextWaveKeyCombo({
				key: keyEvent.key.toUpperCase(),
				shiftKey: keyEvent.shiftKey,
				altKey: keyEvent.altKey,
				ctrlKey: keyEvent.ctrlKey,
				metaKey: keyEvent.metaKey
			});
		}


	}

	var changeBrushToBasicTower = function() {
		if(fakeBasicTower) {
			cursor.setBrush(fakeBasicTower.getGraphics());
		}
		selectedTowerType = 'basic';
	}

	var changeBrushToMissileTower = function() {
		if(fakeMissileTower) {
			cursor.setBrush(fakeMissileTower.getGraphics());
		}
		selectedTowerType = 'missile';
	}

	var changeBrushToGrenadeTower = function() {
		if(fakeGrenadeTower) {
			cursor.setBrush(fakeGrenadeTower.getGraphics());
		}
		selectedTowerType = 'grenade';
	}

	var changeBrushToFreezingTower = function() {
		if(fakeFreezingTower) {
			cursor.setBrush(fakeFreezingTower.getGraphics());
		}
		selectedTowerType = 'freezing'
	}

	var changeUpgradeKeyCombo = function(spec) {
		// console.log(spec);
		localStorage['TowerDefense.keys.upgradeKey'] = JSON.stringify(spec);
	}

	var changeSellKeyCombo = function(spec) {
		localStorage['TowerDefense.keys.sellKey'] = JSON.stringify(spec);
	}

	var changeNextWaveKeyCombo = function(spec) {
		localStorage['TowerDefense.keys.nextKey'] = JSON.stringify(spec);
	}

	var init = function() {
		if (!localStorage['TowerDefense.keys.upgradeKey']) {
			localStorage['TowerDefense.keys.upgradeKey'] = JSON.stringify({
				key: 'U',
				shiftKey: false,
				altKey: false,
				ctrlKey: false,
				metaKey: false
			});
			// console.log('init localStorage upgrade');
		}
		if (!localStorage['TowerDefense.keys.sellKey']) {
			localStorage['TowerDefense.keys.sellKey'] = JSON.stringify({
				key: 'S',
				shiftKey: false,
				altKey: false,
				ctrlKey: false,
				metaKey: false
			});
			// console.log('init localStorage sell');
		}
		if (!localStorage['TowerDefense.keys.nextKey']) {
			localStorage['TowerDefense.keys.nextKey'] = JSON.stringify({
				key: 'G',
				shiftKey: false,
				altKey: false,
				ctrlKey: false,
				metaKey: false
			});
			// console.log('init localStorage next');
		}

		fakeBasicTower = towers.createFakeTower({
			type: 'basic'
		});
		fakeMissileTower = towers.createFakeTower({
			type: 'missile'
		});
		fakeGrenadeTower = towers.createFakeTower({
			type: 'grenade'
		});
		fakeFreezingTower = towers.createFakeTower({
			type: 'freezing'
		});
		selectedTowerType = null;
		towersSold = false;

		keyboard.registerUpgradeCallback(upgradeTower);
		keyboard.registerSellCallback(sellTower);
		keyboard.registerNextWaveCallback(startNextLevel);
	}

	var getSelectedTowerType = function() {
		return selectedTowerType;
	}

	var clearSelectedTowerType = function() {
		selectedTowerType = null;
	}

	var update = function() {
		var currentTower = towers.getSelectedTower(),
			curUpgradeLevel = 0,
			curUpgradeCost = 0,
			soldFlag = towersSold;
		towersSold = false;

		if (currentTower !== null) {
			curUpgradeLevel = currentTower.getUpgradeLevel();
			curUpgradeCost = currentTower.getUpgradeCost();
		}


		document.getElementById('playerScore').innerHTML = scores.getScore();
		document.getElementById('playerLives').innerHTML = scores.getLives();
		document.getElementById('playerCredits').innerHTML = scores.getCredits();
		document.getElementById('currentLevel').innerHTML = levels.getCurrentLevel();
		document.getElementById('currentTowerUpgradeLevel').innerHTML = curUpgradeLevel;
		document.getElementById('currentTowerUpgradeCost').innerHTML = curUpgradeCost;

		return {
			towersSold: soldFlag
		}
	}

	var sellTower = function() {
		var toSell = towers.getSelectedTower();
		if (toSell !== null) {
			toSell.sell();
			towersSold = true;
		}
	}

	var upgradeTower = function() {
		var toUpgrade = towers.getSelectedTower();
		if (toUpgrade !== null) {
			toUpgrade.upgrade();
		}
	}

	var startNextLevel = function() {
		TowerDefense.Level.startNextLevel();
	}

	var toggleBGM = function() {
		playBGM = !playBGM;
		if (playBGM) {
			document.getElementById('backgroundMusic').play();
		}
		else {
			document.getElementById('backgroundMusic').pause();
		}
	}

	var getPlayerName = function() {
		return document.getElementById('playerNameField').value;
	}

	return {
		init: init,
		update: update,
		promptForKeyChange: promptForKeyChange,
		changeBrushToBasicTower: changeBrushToBasicTower,
		changeBrushToMissileTower: changeBrushToMissileTower,
		changeBrushToGrenadeTower: changeBrushToGrenadeTower,
		changeBrushToFreezingTower: changeBrushToFreezingTower,
		getSelectedTowerType: getSelectedTowerType,
		clearSelectedTowerType: clearSelectedTowerType,
		sellTower: sellTower,
		upgradeTower: upgradeTower,
		startNextLevel: startNextLevel,
		toggleBGM: toggleBGM,
		getPlayerName: getPlayerName
	}
}(TowerDefense.Cursor, TowerDefense.Towers, TowerDefense.Scoring, TowerDefense.Level, 
	TowerDefense.Input));
