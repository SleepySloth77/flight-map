// Global Comprehensive Flight Tracker Application
class ComprehensiveFlightTracker {
    constructor() {
        this.globe = null;
        this.flights = [];
        this.airports = [];
        this.routes = [];
        this.autoRotate = true;
        this.showPaths = true;
        this.updateInterval = null;
        this.lastUpdateTime = null;
        this.retryCount = 0;
        this.maxRetries = 3;
        this.globeReady = false;
        
        // Configuration for ultra-thin comprehensive coverage
        this.config = {
            updateInterval: 30000,
            maxFlights: 500,
            arcStrokeWidth: 0.4,
            arcColor: 'rgba(255, 84, 89, 0.8)',
            openskyApiUrl: 'https://opensky-network.org/api/states/all'
        };

        // Complete airport database with comprehensive global coverage
        this.completeAirportDatabase = [
            {"code": "JFK", "name": "John F. Kennedy", "lat": 40.6413, "lng": -73.7781, "city": "New York", "country": "USA"},
            {"code": "LAX", "name": "Los Angeles", "lat": 33.9425, "lng": -118.4081, "city": "Los Angeles", "country": "USA"},
            {"code": "ORD", "name": "O'Hare", "lat": 41.9742, "lng": -87.9073, "city": "Chicago", "country": "USA"},
            {"code": "SFO", "name": "San Francisco", "lat": 37.6213, "lng": -122.3790, "city": "San Francisco", "country": "USA"},
            {"code": "LHR", "name": "London Heathrow", "lat": 51.4700, "lng": -0.4543, "city": "London", "country": "UK"},
            {"code": "CDG", "name": "Charles de Gaulle", "lat": 49.0097, "lng": 2.5479, "city": "Paris", "country": "France"},
            {"code": "FRA", "name": "Frankfurt", "lat": 50.0379, "lng": 8.5622, "city": "Frankfurt", "country": "Germany"},
            {"code": "AMS", "name": "Amsterdam Schiphol", "lat": 52.3105, "lng": 4.7683, "city": "Amsterdam", "country": "Netherlands"},
            {"code": "NRT", "name": "Narita", "lat": 35.7720, "lng": 140.3929, "city": "Tokyo", "country": "Japan"},
            {"code": "HND", "name": "Haneda", "lat": 35.5494, "lng": 139.7798, "city": "Tokyo", "country": "Japan"},
            {"code": "ICN", "name": "Seoul Incheon", "lat": 37.4602, "lng": 126.4407, "city": "Seoul", "country": "South Korea"},
            {"code": "PEK", "name": "Beijing Capital", "lat": 40.0799, "lng": 116.6031, "city": "Beijing", "country": "China"},
            {"code": "PVG", "name": "Shanghai Pudong", "lat": 31.1443, "lng": 121.8083, "city": "Shanghai", "country": "China"},
            {"code": "CAN", "name": "Guangzhou", "lat": 23.3924, "lng": 113.2988, "city": "Guangzhou", "country": "China"},
            {"code": "HKG", "name": "Hong Kong", "lat": 22.3080, "lng": 113.9185, "city": "Hong Kong", "country": "Hong Kong"},
            {"code": "BKK", "name": "Bangkok Suvarnabhumi", "lat": 13.6900, "lng": 100.7501, "city": "Bangkok", "country": "Thailand"},
            {"code": "SIN", "name": "Singapore Changi", "lat": 1.3644, "lng": 103.9915, "city": "Singapore", "country": "Singapore"},
            {"code": "KUL", "name": "Kuala Lumpur", "lat": 2.7456, "lng": 101.7072, "city": "Kuala Lumpur", "country": "Malaysia"},
            {"code": "CGK", "name": "Jakarta Soekarno-Hatta", "lat": -6.1256, "lng": 106.6558, "city": "Jakarta", "country": "Indonesia"},
            {"code": "DXB", "name": "Dubai International", "lat": 25.2532, "lng": 55.3657, "city": "Dubai", "country": "UAE"},
            {"code": "DOH", "name": "Doha Hamad", "lat": 25.2731, "lng": 51.6080, "city": "Doha", "country": "Qatar"},
            {"code": "IST", "name": "Istanbul Airport", "lat": 41.2619, "lng": 28.7279, "city": "Istanbul", "country": "Turkey"},
            {"code": "SVO", "name": "Sheremetyevo", "lat": 55.9726, "lng": 37.4146, "city": "Moscow", "country": "Russia"},
            {"code": "BOM", "name": "Mumbai", "lat": 19.0896, "lng": 72.8656, "city": "Mumbai", "country": "India"},
            {"code": "DEL", "name": "Delhi", "lat": 28.5562, "lng": 77.1000, "city": "Delhi", "country": "India"},
            {"code": "SYD", "name": "Sydney", "lat": -33.9399, "lng": 151.1753, "city": "Sydney", "country": "Australia"},
            {"code": "MEL", "name": "Melbourne", "lat": -37.6690, "lng": 144.8410, "city": "Melbourne", "country": "Australia"},
            {"code": "GRU", "name": "São Paulo", "lat": -23.4356, "lng": -46.4731, "city": "São Paulo", "country": "Brazil"},
            {"code": "EZE", "name": "Buenos Aires", "lat": -34.8222, "lng": -58.5358, "city": "Buenos Aires", "country": "Argentina"},
            {"code": "CAI", "name": "Cairo", "lat": 30.1219, "lng": 31.4056, "city": "Cairo", "country": "Egypt"},
            {"code": "JNB", "name": "Johannesburg", "lat": -26.1392, "lng": 28.2460, "city": "Johannesburg", "country": "South Africa"},
            {"code": "LOS", "name": "Lagos", "lat": 6.5774, "lng": 3.3212, "city": "Lagos", "country": "Nigeria"},
            {"code": "ADD", "name": "Addis Ababa", "lat": 8.9806, "lng": 38.7992, "city": "Addis Ababa", "country": "Ethiopia"}
        ];

        // Comprehensive route network covering all regions
        this.comprehensiveRoutes = [
            // Major Asian routes (previously missing)
            {"from": "NRT", "to": "ICN"}, {"from": "NRT", "to": "PVG"}, {"from": "NRT", "to": "BKK"}, 
            {"from": "NRT", "to": "SIN"}, {"from": "NRT", "to": "HKG"}, {"from": "NRT", "to": "LAX"}, 
            {"from": "NRT", "to": "SFO"}, {"from": "NRT", "to": "LHR"}, {"from": "NRT", "to": "CDG"},
            
            // Korea connections
            {"from": "ICN", "to": "PEK"}, {"from": "ICN", "to": "PVG"}, {"from": "ICN", "to": "BKK"}, 
            {"from": "ICN", "to": "SIN"}, {"from": "ICN", "to": "LAX"}, {"from": "ICN", "to": "SFO"},
            {"from": "ICN", "to": "HKG"}, {"from": "ICN", "to": "LHR"}, {"from": "ICN", "to": "FRA"},
            
            // China major hubs
            {"from": "PVG", "to": "NRT"}, {"from": "PVG", "to": "BKK"}, {"from": "PVG", "to": "SIN"}, 
            {"from": "PVG", "to": "HKG"}, {"from": "PVG", "to": "LAX"}, {"from": "PVG", "to": "LHR"},
            {"from": "PEK", "to": "ICN"}, {"from": "PEK", "to": "SIN"}, {"from": "PEK", "to": "LHR"},
            {"from": "PEK", "to": "LAX"}, {"from": "PEK", "to": "FRA"}, {"from": "CAN", "to": "SIN"},
            
            // Southeast Asia network
            {"from": "BKK", "to": "SIN"}, {"from": "BKK", "to": "KUL"}, {"from": "BKK", "to": "HKG"}, 
            {"from": "BKK", "to": "CGK"}, {"from": "BKK", "to": "DXB"}, {"from": "BKK", "to": "LHR"},
            {"from": "SIN", "to": "KUL"}, {"from": "SIN", "to": "CGK"}, {"from": "SIN", "to": "HKG"}, 
            {"from": "SIN", "to": "SYD"}, {"from": "SIN", "to": "DXB"}, {"from": "SIN", "to": "LHR"},
            {"from": "KUL", "to": "CGK"}, {"from": "KUL", "to": "SIN"}, {"from": "KUL", "to": "BKK"},
            
            // Trans-Pacific routes
            {"from": "JFK", "to": "NRT"}, {"from": "LAX", "to": "NRT"}, {"from": "LAX", "to": "ICN"},
            {"from": "LAX", "to": "HKG"}, {"from": "LAX", "to": "SYD"}, {"from": "SFO", "to": "NRT"},
            {"from": "SFO", "to": "ICN"}, {"from": "SFO", "to": "SIN"}, {"from": "ORD", "to": "NRT"},
            
            // Trans-Atlantic routes
            {"from": "JFK", "to": "LHR"}, {"from": "JFK", "to": "CDG"}, {"from": "JFK", "to": "FRA"},
            {"from": "LAX", "to": "LHR"}, {"from": "ORD", "to": "LHR"}, {"from": "ORD", "to": "FRA"},
            {"from": "JFK", "to": "IST"}, {"from": "ORD", "to": "AMS"}, {"from": "SFO", "to": "LHR"},
            
            // European network
            {"from": "LHR", "to": "CDG"}, {"from": "LHR", "to": "FRA"}, {"from": "LHR", "to": "AMS"}, 
            {"from": "CDG", "to": "FRA"}, {"from": "CDG", "to": "AMS"}, {"from": "FRA", "to": "AMS"},
            {"from": "LHR", "to": "IST"}, {"from": "CDG", "to": "IST"}, {"from": "FRA", "to": "SVO"},
            
            // Middle East hub connections
            {"from": "DXB", "to": "DOH"}, {"from": "DXB", "to": "BOM"}, {"from": "DXB", "to": "DEL"}, 
            {"from": "DXB", "to": "SIN"}, {"from": "DXB", "to": "LHR"}, {"from": "DXB", "to": "JFK"},
            {"from": "DOH", "to": "BOM"}, {"from": "DOH", "to": "SIN"}, {"from": "DOH", "to": "LHR"},
            {"from": "IST", "to": "CAI"}, {"from": "IST", "to": "DXB"}, {"from": "IST", "to": "SVO"},
            
            // Indian subcontinent
            {"from": "BOM", "to": "DEL"}, {"from": "BOM", "to": "SIN"}, {"from": "BOM", "to": "DXB"}, 
            {"from": "BOM", "to": "LHR"}, {"from": "DEL", "to": "DXB"}, {"from": "DEL", "to": "LHR"},
            {"from": "DEL", "to": "SIN"}, {"from": "DEL", "to": "BKK"},
            
            // Australia/Oceania
            {"from": "SYD", "to": "MEL"}, {"from": "SYD", "to": "SIN"}, {"from": "SYD", "to": "LAX"}, 
            {"from": "SYD", "to": "LHR"}, {"from": "MEL", "to": "SIN"}, {"from": "MEL", "to": "DXB"},
            
            // South America
            {"from": "GRU", "to": "EZE"}, {"from": "GRU", "to": "JFK"}, {"from": "GRU", "to": "LHR"}, 
            {"from": "GRU", "to": "CDG"}, {"from": "EZE", "to": "JFK"}, {"from": "EZE", "to": "LHR"},
            
            // Africa
            {"from": "CAI", "to": "IST"}, {"from": "CAI", "to": "DXB"}, {"from": "CAI", "to": "LHR"}, 
            {"from": "CAI", "to": "JNB"}, {"from": "JNB", "to": "LOS"}, {"from": "JNB", "to": "ADD"}, 
            {"from": "JNB", "to": "DXB"}, {"from": "JNB", "to": "LHR"}, {"from": "ADD", "to": "DXB"},
            {"from": "LOS", "to": "LHR"}, {"from": "ADD", "to": "LHR"},
            
            // North American domestic
            {"from": "JFK", "to": "LAX"}, {"from": "JFK", "to": "ORD"}, {"from": "JFK", "to": "SFO"},
            {"from": "LAX", "to": "ORD"}, {"from": "LAX", "to": "SFO"}, {"from": "ORD", "to": "SFO"}
        ];

        this.init();
    }

    async init() {
        try {
            console.log('Starting Comprehensive Flight Tracker initialization...');
            
            // Wait for libraries to load
            await this.waitForLibraries();
            this.updateProgress(10, 'Libraries loaded...');
            
            // Initialize globe with retry logic
            await this.initializeGlobeWithRetry();
            this.updateProgress(30, 'Globe initialized...');
            
            // Load data
            this.loadAirportData();
            this.updateProgress(50, 'Loading routes...');
            
            await this.delay(300);
            this.generateComprehensiveRoutes();
            this.updateProgress(70, 'Fetching flights...');
            
            await this.delay(300);
            await this.loadFlightData();
            this.updateProgress(90, 'Finalizing...');
            
            this.setupEventListeners();
            this.startAutoUpdate();
            this.updateProgress(100, 'Complete!');
            
            await this.delay(800);
            this.hideLoadingScreen();
            
            console.log('Comprehensive Flight Tracker initialized successfully');
            
        } catch (error) {
            console.error('Initialization failed:', error);
            this.showError('Failed to initialize globe. Loading fallback data...');
            await this.delay(1000);
            this.loadFallbackData();
            this.hideLoadingScreen();
        }
    }

    async waitForLibraries() {
        return new Promise((resolve, reject) => {
            let attempts = 0;
            const maxAttempts = 50;
            
            const checkLibraries = () => {
                attempts++;
                
                if (typeof Globe !== 'undefined' && typeof THREE !== 'undefined') {
                    console.log('Libraries loaded successfully');
                    resolve();
                } else if (attempts >= maxAttempts) {
                    reject(new Error('Libraries failed to load'));
                } else {
                    setTimeout(checkLibraries, 100);
                }
            };
            
            checkLibraries();
        });
    }

    async initializeGlobeWithRetry() {
        const maxRetries = 3;
        let attempt = 0;
        
        while (attempt < maxRetries) {
            try {
                await this.initializeGlobe();
                this.globeReady = true;
                return;
            } catch (error) {
                attempt++;
                console.error(`Globe initialization attempt ${attempt} failed:`, error);
                if (attempt >= maxRetries) {
                    throw error;
                }
                await this.delay(1000);
            }
        }
    }

    async initializeGlobe() {
        return new Promise((resolve, reject) => {
            try {
                const container = document.getElementById('globe-container');
                
                if (!container) {
                    throw new Error('Globe container not found');
                }

                console.log('Creating globe instance...');
                this.globe = Globe({
                    rendererConfig: {
                        antialias: true,
                        alpha: true,
                        logarithmicDepthBuffer: true
                    }
                });

                if (!this.globe) {
                    throw new Error('Failed to create globe instance');
                }

                // Configure globe
                this.globe
                    .backgroundColor('rgba(0,0,17,1)')
                    .showAtmosphere(true)
                    .atmosphereColor('#4a90e2')
                    .atmosphereAltitude(0.15)
                    .showGraticules(false)
                    .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
                    .bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png')
                    .width(container.clientWidth)
                    .height(container.clientHeight);

                console.log('Mounting globe to container...');
                this.globe(container);

                // Set initial view
                this.globe.pointOfView({ 
                    lat: 30, 
                    lng: 100, 
                    altitude: 2.5 
                });

                // Configure controls
                setTimeout(() => {
                    try {
                        const controls = this.globe.controls();
                        if (controls) {
                            controls.autoRotate = this.autoRotate;
                            controls.autoRotateSpeed = 0.5;
                            controls.enableDamping = true;
                            controls.dampingFactor = 0.1;
                            controls.minDistance = 101;
                            controls.maxDistance = 1000;
                        }
                        
                        console.log('Globe initialization complete');
                        resolve();
                    } catch (controlsError) {
                        console.warn('Controls setup failed:', controlsError);
                        resolve(); // Continue without controls
                    }
                }, 1000);

            } catch (error) {
                console.error('Globe initialization error:', error);
                reject(error);
            }
        });
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    updateProgress(percent, text) {
        const progressFill = document.getElementById('progress-fill');
        const progressText = document.getElementById('progress-text');
        if (progressFill) progressFill.style.width = `${percent}%`;
        if (progressText) progressText.textContent = text;
    }

    loadAirportData() {
        this.airports = this.completeAirportDatabase.map(airport => ({
            ...airport,
            type: 'airport'
        }));
        
        console.log(`Loaded ${this.airports.length} airports worldwide`);
    }

    generateComprehensiveRoutes() {
        // Convert route definitions to arc data
        this.routes = this.comprehensiveRoutes.map(route => {
            const fromAirport = this.airports.find(a => a.code === route.from);
            const toAirport = this.airports.find(a => a.code === route.to);
            
            if (fromAirport && toAirport) {
                return {
                    startLat: fromAirport.lat,
                    startLng: fromAirport.lng,
                    endLat: toAirport.lat,
                    endLng: toAirport.lng,
                    from: route.from,
                    to: route.to,
                    type: 'route'
                };
            }
            return null;
        }).filter(route => route !== null);

        // Add additional procedural routes for complete coverage
        this.addProceduralRoutes();

        console.log(`Generated ${this.routes.length} comprehensive flight routes`);
    }

    addProceduralRoutes() {
        const additionalRoutes = [];
        
        // Generate more comprehensive regional connections
        const majorHubs = ['JFK', 'LHR', 'DXB', 'SIN', 'NRT', 'ICN', 'PVG', 'FRA', 'AMS', 'IST', 'BKK', 'HKG'];
        
        // Connect every major hub to multiple other airports
        majorHubs.forEach(hubCode => {
            const hub = this.airports.find(a => a.code === hubCode);
            if (hub) {
                this.airports.forEach(airport => {
                    if (hub.code !== airport.code && Math.random() > 0.6) { // 40% connection rate
                        additionalRoutes.push({
                            startLat: hub.lat,
                            startLng: hub.lng,
                            endLat: airport.lat,
                            endLng: airport.lng,
                            from: hub.code,
                            to: airport.code,
                            type: 'hub_route'
                        });
                    }
                });
            }
        });

        // Add inter-regional routes for complete global coverage
        for (let i = 0; i < this.airports.length; i++) {
            for (let j = i + 1; j < this.airports.length; j++) {
                if (Math.random() > 0.85) { // 15% connection rate for remaining pairs
                    additionalRoutes.push({
                        startLat: this.airports[i].lat,
                        startLng: this.airports[i].lng,
                        endLat: this.airports[j].lat,
                        endLng: this.airports[j].lng,
                        from: this.airports[i].code,
                        to: this.airports[j].code,
                        type: 'regional_route'
                    });
                }
            }
        }

        this.routes = [...this.routes, ...additionalRoutes];
    }

    async loadFlightData() {
        try {
            await this.fetchFlightData();
        } catch (error) {
            console.log('Using comprehensive mock flight data');
            this.generateMockFlights();
        }
        
        // Always update display after loading flight data
        this.updateGlobeDisplay();
    }

    async fetchFlightData() {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        try {
            const response = await fetch(this.config.openskyApiUrl, {
                signal: controller.signal,
                mode: 'cors'
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new Error(`API request failed: ${response.status}`);
            }

            const data = await response.json();
            
            if (!data.states || data.states.length === 0) {
                throw new Error('No flight data received');
            }

            this.processRealFlightData(data.states);
            console.log(`Loaded ${this.flights.length} real flights`);

        } catch (error) {
            console.log('Failed to fetch real flight data, using comprehensive mock data');
            this.generateMockFlights();
            throw error;
        }
    }

    processRealFlightData(states) {
        this.flights = states
            .filter(state => this.isValidFlight(state))
            .slice(0, this.config.maxFlights)
            .map(state => this.parseFlightState(state));
    }

    isValidFlight(state) {
        const [icao24, callsign, origin_country, time_position, last_contact, longitude, latitude, baro_altitude, on_ground] = state;
        
        return longitude !== null && 
               latitude !== null && 
               !on_ground && 
               baro_altitude !== null &&
               baro_altitude > 500 && 
               Math.abs(latitude) <= 85 && 
               Math.abs(longitude) <= 180;
    }

    parseFlightState(state) {
        const [icao24, callsign, origin_country, time_position, last_contact, longitude, latitude, baro_altitude, on_ground, velocity, true_track] = state;
        
        return {
            id: icao24,
            icao24,
            callsign: callsign ? callsign.trim() : icao24,
            origin_country,
            lat: latitude,
            lng: longitude,
            altitude: Math.round(baro_altitude * 3.28084),
            velocity: velocity ? Math.round(velocity * 3.6) : 0,
            heading: true_track || 0,
            type: 'aircraft'
        };
    }

    generateMockFlights() {
        this.flights = [];
        
        // Generate flights positioned along major routes
        this.routes.forEach((route, index) => {
            if (index % 2 === 0 && this.flights.length < 250) { // One flight per 2 routes
                const progress = Math.random();
                const lat = route.startLat + (route.endLat - route.startLat) * progress;
                const lng = route.startLng + (route.endLng - route.startLng) * progress;
                
                this.flights.push({
                    id: `flight_${index}`,
                    icao24: `${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
                    callsign: `${['AA', 'DL', 'UA', 'BA', 'LH', 'AF', 'KL', 'EK', 'SQ', 'CX', 'NH', 'KE', 'TG', 'CI', 'JL', 'OZ'][Math.floor(Math.random() * 16)]}${Math.floor(Math.random() * 999) + 100}`,
                    origin_country: this.getCountryForRoute(route),
                    lat: lat,
                    lng: lng,
                    altitude: Math.floor(Math.random() * 35000) + 10000,
                    velocity: Math.floor(Math.random() * 300) + 200,
                    heading: Math.floor(Math.random() * 360),
                    type: 'aircraft'
                });
            }
        });
        
        console.log(`Generated ${this.flights.length} mock flights along routes`);
    }

    getCountryForRoute(route) {
        const fromAirport = this.airports.find(a => a.code === route.from);
        return fromAirport ? fromAirport.country : 'Unknown';
    }

    loadFallbackData() {
        console.log('Loading fallback data without globe...');
        this.loadAirportData();
        this.generateComprehensiveRoutes();
        this.generateMockFlights();
        this.updateStats();
        this.setupEventListeners();
    }

    updateGlobeDisplay() {
        if (!this.globe || !this.globeReady) {
            console.warn('Globe not ready for display update');
            return;
        }

        try {
            console.log('Updating globe display...');
            
            // Combine all points (airports and flights)
            const allPoints = [
                ...this.airports,
                ...this.flights
            ];

            // Update points with enhanced visibility
            this.globe
                .pointsData(allPoints)
                .pointAltitude(d => d.type === 'aircraft' ? 0.01 : 0.005)
                .pointRadius(d => d.type === 'aircraft' ? 0.1 : 0.08)
                .pointColor(d => d.type === 'aircraft' ? '#ffeb3b' : '#32c8dd')
                .pointResolution(6)
                .pointLabel(d => this.getPointLabel(d))
                .onPointClick(point => this.handlePointClick(point));

            // Add comprehensive flight paths with ultra-thin lines
            if (this.showPaths && this.routes.length > 0) {
                console.log(`Adding ${this.routes.length} ultra-thin flight paths...`);
                this.globe
                    .arcsData(this.routes)
                    .arcColor(() => this.config.arcColor)
                    .arcStroke(this.config.arcStrokeWidth)
                    .arcAltitude(0.06)
                    .arcDashLength(0)
                    .arcDashGap(0)
                    .arcDashAnimateTime(0);
            } else {
                this.globe.arcsData([]);
            }

            this.updateStats();
            console.log(`Globe updated: ${allPoints.length} points, ${this.routes.length} routes`);

        } catch (error) {
            console.error('Error updating globe display:', error);
            this.showError('Display update failed');
        }
    }

    getPointLabel(point) {
        if (point.type === 'aircraft') {
            return `✈️ ${point.callsign}\n🌍 ${point.origin_country}\n📏 ${point.altitude?.toLocaleString()} ft\n🚀 ${point.velocity} km/h`;
        } else {
            return `✈️ ${point.name} (${point.code})\n🏙️ ${point.city}, ${point.country}`;
        }
    }

    handlePointClick(point) {
        if (point.type === 'aircraft') {
            this.showFlightInfo(point);
        } else {
            this.showAirportInfo(point);
        }
    }

    showFlightInfo(flight) {
        const modal = document.getElementById('flight-info');
        if (modal) {
            document.getElementById('flight-callsign').textContent = flight.callsign || 'Unknown Flight';
            document.getElementById('flight-country').textContent = flight.origin_country || 'Unknown';
            document.getElementById('flight-altitude').textContent = `${flight.altitude?.toLocaleString()} ft`;
            document.getElementById('flight-speed').textContent = `${flight.velocity} km/h`;
            document.getElementById('flight-coords').textContent = `${flight.lat?.toFixed(4)}, ${flight.lng?.toFixed(4)}`;
            modal.classList.remove('hidden');
        }
    }

    showAirportInfo(airport) {
        const modal = document.getElementById('airport-info');
        if (modal) {
            document.getElementById('airport-name').textContent = airport.name;
            document.getElementById('airport-code').textContent = airport.code;
            document.getElementById('airport-city').textContent = airport.city;
            document.getElementById('airport-country').textContent = airport.country;
            document.getElementById('airport-coords').textContent = `${airport.lat.toFixed(4)}, ${airport.lng.toFixed(4)}`;
            modal.classList.remove('hidden');
        }
    }

    updateStats() {
        const routeCount = document.getElementById('route-count');
        const flightCount = document.getElementById('flight-count');
        const airportCount = document.getElementById('airport-count');
        const lastUpdate = document.getElementById('last-update');

        if (routeCount) routeCount.textContent = this.routes.length.toLocaleString();
        if (flightCount) flightCount.textContent = this.flights.length.toLocaleString();
        if (airportCount) airportCount.textContent = this.airports.length.toLocaleString();
        
        this.lastUpdateTime = new Date();
        if (lastUpdate) lastUpdate.textContent = this.lastUpdateTime.toLocaleTimeString();
    }

    setupEventListeners() {
        // Toggle paths
        const toggleBtn = document.getElementById('toggle-paths-btn');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                this.showPaths = !this.showPaths;
                toggleBtn.textContent = this.showPaths ? 'Hide Paths' : 'Show Paths';
                this.updateGlobeDisplay();
            });
        }

        // Auto-rotate toggle
        const autoRotateBtn = document.getElementById('auto-rotate-btn');
        if (autoRotateBtn) {
            autoRotateBtn.addEventListener('click', () => {
                this.autoRotate = !this.autoRotate;
                if (this.globe && this.globe.controls()) {
                    this.globe.controls().autoRotate = this.autoRotate;
                }
                autoRotateBtn.textContent = `Auto Rotate: ${this.autoRotate ? 'ON' : 'OFF'}`;
            });
        }

        // Refresh button
        const refreshBtn = document.getElementById('refresh-btn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                this.loadFlightData();
            });
        }

        // Close modals
        const closeFlightInfo = document.getElementById('close-flight-info');
        const closeAirportInfo = document.getElementById('close-airport-info');
        
        if (closeFlightInfo) {
            closeFlightInfo.addEventListener('click', () => {
                document.getElementById('flight-info').classList.add('hidden');
            });
        }

        if (closeAirportInfo) {
            closeAirportInfo.addEventListener('click', () => {
                document.getElementById('airport-info').classList.add('hidden');
            });
        }

        // Close modals on escape
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                const flightInfo = document.getElementById('flight-info');
                const airportInfo = document.getElementById('airport-info');
                if (flightInfo) flightInfo.classList.add('hidden');
                if (airportInfo) airportInfo.classList.add('hidden');
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (this.globe) {
                const container = document.getElementById('globe-container');
                this.globe.width(container.clientWidth).height(container.clientHeight);
            }
        });
    }

    startAutoUpdate() {
        this.updateInterval = setInterval(async () => {
            try {
                await this.fetchFlightData();
            } catch (error) {
                console.log('Auto-update failed, continuing with existing data');
            }
        }, this.config.updateInterval);
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.transition = 'opacity 0.5s ease';
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }

    showError(message = 'Failed to load live flight data') {
        const errorEl = document.getElementById('error-message');
        if (errorEl) {
            const msgEl = errorEl.querySelector('p');
            if (msgEl) msgEl.textContent = message;
            errorEl.classList.remove('hidden');

            setTimeout(() => {
                this.hideError();
            }, 5000);
        }
    }

    hideError() {
        const errorEl = document.getElementById('error-message');
        if (errorEl) {
            errorEl.classList.add('hidden');
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, starting Comprehensive Flight Tracker...');
    
    try {
        new ComprehensiveFlightTracker();
    } catch (error) {
        console.error('Failed to start application:', error);
    }
});