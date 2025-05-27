class QuantumNexusGame {
    constructor() {
        this.gameState = {
            quantumEnergy: 0,
            energyPerSecond: 0,
            currentDimension: 3.0,
            realityFlux: 1.0,
            totalClicks: 0,
            totalEnergyEarned: 0,
            startTime: Date.now(),
            lastSave: Date.now()
        };

        this.upgrades = [
            {
                id: 'photon_collector',
                name: 'Photon Collector',
                description: 'Harnesses ambient light particles',
                baseCost: 10,
                baseEps: 0.1,
                count: 0,
                costMultiplier: 1.15
            },
            {
                id: 'electron_accelerator',
                name: 'Electron Accelerator',
                description: 'Accelerates electrons to near light speed',
                baseCost: 100,
                baseEps: 1,
                count: 0,
                costMultiplier: 1.2
            },
            {
                id: 'quantum_entangler',
                name: 'Quantum Entangler',
                description: 'Creates entangled particle pairs',
                baseCost: 1000,
                baseEps: 8,
                count: 0,
                costMultiplier: 1.25
            },
            {
                id: 'higgs_manipulator',
                name: 'Higgs Manipulator',
                description: 'Manipulates the Higgs field directly',
                baseCost: 12000,
                baseEps: 47,
                count: 0,
                costMultiplier: 1.3
            },
            {
                id: 'dark_matter_harvester',
                name: 'Dark Matter Harvester',
                description: 'Extracts energy from dark matter',
                baseCost: 130000,
                baseEps: 260,
                count: 0,
                costMultiplier: 1.35
            },
            {
                id: 'antimatter_reactor',
                name: 'Antimatter Reactor',
                description: 'Annihilates matter for pure energy',
                baseCost: 1400000,
                baseEps: 1400,
                count: 0,
                costMultiplier: 1.4
            },
            {
                id: 'blackhole_engine',
                name: 'Black Hole Engine',
                description: 'Harnesses Hawking radiation',
                baseCost: 20000000,
                baseEps: 7800,
                count: 0,
                costMultiplier: 1.45
            },
            {
                id: 'dimensional_rift',
                name: 'Dimensional Rift',
                description: 'Draws energy from parallel dimensions',
                baseCost: 330000000,
                baseEps: 44000,
                count: 0,
                costMultiplier: 1.5
            }
        ];

        this.research = [
            {
                id: 'efficiency_boost',
                name: 'Efficiency Matrix',
                description: 'Increases all production by 100%',
                cost: 1000,
                completed: false,
                multiplier: 2.0
            },
            {
                id: 'click_power',
                name: 'Manual Override',
                description: 'Each click generates more energy',
                cost: 5000,
                completed: false,
                clickMultiplier: 5.0
            },
            {
                id: 'quantum_resonance',
                name: 'Quantum Resonance',
                description: 'Photon Collectors are 300% more effective',
                cost: 25000,
                completed: false,
                upgradeMultiplier: { photon_collector: 4.0 }
            },
            {
                id: 'dimensional_breakthrough',
                name: 'Dimensional Breakthrough',
                description: 'Unlocks higher dimensional operations',
                cost: 100000,
                completed: false,
                dimensionBoost: 0.5
            },
            {
                id: 'reality_manipulation',
                name: 'Reality Manipulation',
                description: 'Increases Reality Flux significantly',
                cost: 1000000,
                completed: false,
                realityFluxBoost: 0.5
            }
        ];

        this.achievements = [
            { id: 'first_click', name: 'First Contact', description: 'Click the quantum core', threshold: 1, type: 'clicks', unlocked: false },
            { id: 'hundred_clicks', name: 'Quantum Dancer', description: 'Click 100 times', threshold: 100, type: 'clicks', unlocked: false },
            { id: 'first_upgrade', name: 'Evolution Begins', description: 'Purchase your first upgrade', threshold: 1, type: 'upgrades', unlocked: false },
            { id: 'first_thousand', name: 'Energy Collector', description: 'Collect 1,000 energy', threshold: 1000, type: 'energy', unlocked: false },
            { id: 'million_energy', name: 'Quantum Millionaire', description: 'Collect 1,000,000 energy', threshold: 1000000, type: 'energy', unlocked: false },
            { id: 'first_research', name: 'Scientist', description: 'Complete your first research', threshold: 1, type: 'research', unlocked: false },
            { id: 'automation_master', name: 'Automation Master', description: 'Reach 1,000 EPS', threshold: 1000, type: 'eps', unlocked: false },
            { id: 'dimension_walker', name: 'Dimension Walker', description: 'Reach dimension 4.0', threshold: 4.0, type: 'dimension', unlocked: false }
        ];

        this.clickPower = 1;
        this.globalMultiplier = 1;
        this.upgradeMultipliers = {};
        
        this.initializeGame();
        this.bindEvents();
        this.startGameLoop();
        this.loadGame();
    }

    initializeGame() {
        this.updateUI();
        this.generateUpgradeElements();
        this.generateResearchElements();
        this.generateAchievementElements();
        this.createParticleEffect();
    }

    bindEvents() {
        const quantumCore = document.getElementById('quantumCore');
        const clickRipple = document.getElementById('clickRipple');
        
        quantumCore.addEventListener('click', (e) => {
            this.handleCoreClick(e);
            this.triggerRippleEffect(clickRipple);
        });

        // Auto-save every 30 seconds
        setInterval(() => this.saveGame(), 30000);
        
        // Save on page unload
        window.addEventListener('beforeunload', () => this.saveGame());
    }

    handleCoreClick(e) {
        const energy = this.clickPower * this.realityFlux;
        this.gameState.quantumEnergy += energy;
        this.gameState.totalClicks++;
        this.gameState.totalEnergyEarned += energy;
        
        this.createClickParticles(e);
        this.checkAchievements();
        this.updateUI();
    }

    triggerRippleEffect(ripple) {
        ripple.classList.remove('active');
        void ripple.offsetWidth; // Force reflow
        ripple.classList.add('active');
    }

    createClickParticles(e) {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.className = 'click-particle';
            particle.style.cssText = `
                position: fixed;
                left: ${centerX}px;
                top: ${centerY}px;
                width: 4px;
                height: 4px;
                background: #fff;
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                box-shadow: 0 0 6px #fff;
            `;
            
            document.body.appendChild(particle);
            
            const angle = (Math.PI * 2 * i) / 5;
            const distance = 50 + Math.random() * 50;
            const endX = centerX + Math.cos(angle) * distance;
            const endY = centerY + Math.sin(angle) * distance;
            
            particle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${endX - centerX}px, ${endY - centerY}px) scale(0)`, opacity: 0 }
            ], {
                duration: 800,
                easing: 'ease-out'
            }).onfinish = () => particle.remove();
        }
    }

    generateUpgradeElements() {
        const upgradesGrid = document.getElementById('upgradesGrid');
        upgradesGrid.innerHTML = '';
        
        this.upgrades.forEach(upgrade => {
            const upgradeElement = document.createElement('div');
            upgradeElement.className = 'upgrade-item';
            upgradeElement.innerHTML = `
                <div class="upgrade-name">${upgrade.name}</div>
                <div class="upgrade-description">${upgrade.description}</div>
                <div class="upgrade-stats">
                    <div class="upgrade-cost">${this.formatNumber(this.getUpgradeCost(upgrade))}</div>
                    <div class="upgrade-count">×${upgrade.count}</div>
                </div>
            `;
            
            upgradeElement.addEventListener('click', () => this.purchaseUpgrade(upgrade));
            upgradesGrid.appendChild(upgradeElement);
        });
    }

    generateResearchElements() {
        const researchGrid = document.getElementById('researchGrid');
        researchGrid.innerHTML = '';
        
        this.research.forEach(research => {
            const researchElement = document.createElement('div');
            researchElement.className = `research-item ${research.completed ? 'completed' : ''}`;
            researchElement.innerHTML = `
                <div class="research-name">${research.name}</div>
                <div class="research-description">${research.description}</div>
                <div class="research-cost">${research.completed ? 'COMPLETED' : this.formatNumber(research.cost)}</div>
            `;
            
            if (!research.completed) {
                researchElement.addEventListener('click', () => this.purchaseResearch(research));
            }
            researchGrid.appendChild(researchElement);
        });
    }

    generateAchievementElements() {
        const achievementsGrid = document.getElementById('achievementsGrid');
        achievementsGrid.innerHTML = '';
        
        this.achievements.forEach(achievement => {
            const achievementElement = document.createElement('div');
            achievementElement.className = `achievement-item ${achievement.unlocked ? 'unlocked' : ''}`;
            achievementElement.innerHTML = `
                <div class="achievement-name">${achievement.name}</div>
                <div class="achievement-description">${achievement.description}</div>
            `;
            achievementsGrid.appendChild(achievementElement);
        });
    }

    purchaseUpgrade(upgrade) {
        const cost = this.getUpgradeCost(upgrade);
        if (this.gameState.quantumEnergy >= cost) {
            this.gameState.quantumEnergy -= cost;
            upgrade.count++;
            this.updateUpgradeButtons();
            this.calculateEPS();
            this.checkAchievements();
            this.updateUI();
        }
    }

    purchaseResearch(research) {
        if (this.gameState.quantumEnergy >= research.cost && !research.completed) {
            this.gameState.quantumEnergy -= research.cost;
            research.completed = true;
            this.applyResearchEffects(research);
            this.generateResearchElements();
            this.checkAchievements();
            this.updateUI();
        }
    }

    applyResearchEffects(research) {
        if (research.multiplier) {
            this.globalMultiplier *= research.multiplier;
        }
        if (research.clickMultiplier) {
            this.clickPower *= research.clickMultiplier;
        }
        if (research.upgradeMultiplier) {
            Object.assign(this.upgradeMultipliers, research.upgradeMultiplier);
        }
        if (research.dimensionBoost) {
            this.gameState.currentDimension += research.dimensionBoost;
        }
        if (research.realityFluxBoost) {
            this.gameState.realityFlux += research.realityFluxBoost;
        }
        this.calculateEPS();
    }

    getUpgradeCost(upgrade) {
        return Math.floor(upgrade.baseCost * Math.pow(upgrade.costMultiplier, upgrade.count));
    }

    calculateEPS() {
        let totalEPS = 0;
        this.upgrades.forEach(upgrade => {
            const upgradeMultiplier = this.upgradeMultipliers[upgrade.id] || 1;
            totalEPS += upgrade.baseEps * upgrade.count * upgradeMultiplier;
        });
        this.gameState.energyPerSecond = totalEPS * this.globalMultiplier * this.gameState.realityFlux;
    }

    updateUpgradeButtons() {
        const upgradeItems = document.querySelectorAll('.upgrade-item');
        upgradeItems.forEach((item, index) => {
            const upgrade = this.upgrades[index];
            const cost = this.getUpgradeCost(upgrade);
            const costElement = item.querySelector('.upgrade-cost');
            const countElement = item.querySelector('.upgrade-count');
            
            costElement.textContent = this.formatNumber(cost);
            countElement.textContent = `×${upgrade.count}`;
            
            if (this.gameState.quantumEnergy >= cost) {
                item.classList.add('affordable');
                item.classList.remove('unaffordable');
            } else {
                item.classList.remove('affordable');
                item.classList.add('unaffordable');
            }
        });
    }

    checkAchievements() {
        this.achievements.forEach(achievement => {
            if (!achievement.unlocked) {
                let progress = 0;
                switch (achievement.type) {
                    case 'clicks':
                        progress = this.gameState.totalClicks;
                        break;
                    case 'energy':
                        progress = this.gameState.totalEnergyEarned;
                        break;
                    case 'upgrades':
                        progress = this.upgrades.reduce((sum, u) => sum + u.count, 0);
                        break;
                    case 'research':
                        progress = this.research.filter(r => r.completed).length;
                        break;
                    case 'eps':
                        progress = this.gameState.energyPerSecond;
                        break;
                    case 'dimension':
                        progress = this.gameState.currentDimension;
                        break;
                }
                
                if (progress >= achievement.threshold) {
                    achievement.unlocked = true;
                    this.showAchievementNotification(achievement);
                }
            }
        });
        this.generateAchievementElements();
    }

    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 50px;
            right: 50px;
            background: linear-gradient(45deg, rgba(255, 215, 0, 0.9), rgba(255, 165, 0, 0.9));
            color: #000;
            padding: 20px;
            border-radius: 10px;
            font-weight: bold;
            z-index: 10000;
            box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
            transform: translateX(100%);
            transition: transform 0.5s ease;
        `;
        notification.innerHTML = `
            <div style="font-size: 1.2em;">Achievement Unlocked!</div>
            <div style="font-size: 1em; margin-top: 5px;">${achievement.name}</div>
            <div style="font-size: 0.8em; opacity: 0.8; margin-top: 5px;">${achievement.description}</div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.style.transform = 'translateX(0)', 100);
        setTimeout(() => notification.style.transform = 'translateX(100%)', 4000);
        setTimeout(() => notification.remove(), 4500);
    }

    createParticleEffect() {
        const particleField = document.getElementById('particleField');
        
        setInterval(() => {
            if (this.gameState.energyPerSecond > 0) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.bottom = '0px';
                particleField.appendChild(particle);
                
                setTimeout(() => particle.remove(), 4000);
            }
        }, 200);
    }

    formatNumber(num) {
        if (num < 1000) return Math.floor(num).toString();
        if (num < 1000000) return (num / 1000).toFixed(1) + 'K';
        if (num < 1000000000) return (num / 1000000).toFixed(1) + 'M';
        if (num < 1000000000000) return (num / 1000000000).toFixed(1) + 'B';
        return (num / 1000000000000).toFixed(1) + 'T';
    }

    updateUI() {
        document.getElementById('quantumEnergy').textContent = this.formatNumber(this.gameState.quantumEnergy);
        document.getElementById('energyPerSecond').textContent = this.formatNumber(this.gameState.energyPerSecond);
        document.getElementById('currentDimension').textContent = this.gameState.currentDimension.toFixed(1);
        document.getElementById('realityFlux').textContent = this.gameState.realityFlux.toFixed(2) + 'x';
        document.getElementById('coreEnergy').textContent = this.formatNumber(this.gameState.quantumEnergy);
        
        this.updateUpgradeButtons();
        
        // Update reality sync status
        const syncStatus = document.getElementById('realitySync');
        if (this.gameState.energyPerSecond > 1000) {
            syncStatus.textContent = 'CRITICAL';
            syncStatus.style.color = '#ff0000';
        } else if (this.gameState.energyPerSecond > 100) {
            syncStatus.textContent = 'UNSTABLE';
            syncStatus.style.color = '#ffff00';
        } else {
            syncStatus.textContent = 'STABLE';
            syncStatus.style.color = '#00ff00';
        }
    }

    startGameLoop() {
        setInterval(() => {
            if (this.gameState.energyPerSecond > 0) {
                const energyGain = this.gameState.energyPerSecond / 10; // 10 updates per second
                this.gameState.quantumEnergy += energyGain;
                this.gameState.totalEnergyEarned += energyGain;
                this.updateUI();
                this.checkAchievements();
            }
        }, 100);
    }

    saveGame() {
        const saveData = {
            gameState: this.gameState,
            upgrades: this.upgrades,
            research: this.research,
            achievements: this.achievements,
            clickPower: this.clickPower,
            globalMultiplier: this.globalMultiplier,
            upgradeMultipliers: this.upgradeMultipliers
        };
        localStorage.setItem('quantumNexusSave', JSON.stringify(saveData));
    }

    loadGame() {
        const saveData = localStorage.getItem('quantumNexusSave');
        if (saveData) {
            const data = JSON.parse(saveData);
            
            // Load game state
            Object.assign(this.gameState, data.gameState);
            
            // Load upgrades
            if (data.upgrades) {
                data.upgrades.forEach((savedUpgrade, index) => {
                    if (this.upgrades[index]) {
                        this.upgrades[index].count = savedUpgrade.count;
                    }
                });
            }
            
            // Load research
            if (data.research) {
                data.research.forEach((savedResearch, index) => {
                    if (this.research[index]) {
                        this.research[index].completed = savedResearch.completed;
                        if (savedResearch.completed) {
                            this.applyResearchEffects(this.research[index]);
                        }
                    }
                });
            }
            
            // Load achievements
            if (data.achievements) {
                data.achievements.forEach((savedAchievement, index) => {
                    if (this.achievements[index]) {
                        this.achievements[index].unlocked = savedAchievement.unlocked;
                    }
                });
            }
            
            // Load other variables
            if (data.clickPower) this.clickPower = data.clickPower;
            if (data.globalMultiplier) this.globalMultiplier = data.globalMultiplier;
            if (data.upgradeMultipliers) this.upgradeMultipliers = data.upgradeMultipliers;
            
            this.calculateEPS();
            this.updateUI();
            this.generateUpgradeElements();
            this.generateResearchElements();
            this.generateAchievementElements();
        }
    }
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    new QuantumNexusGame();
});