import 'dotenv/config';

export default {
    expo: {
        name: "community-connectivity-orlando",
        slug: "community-connectivity-orlando",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./assets/images/icon.png",
        scheme: "communityconnectivityorlando",
        userInterfaceStyle: "dark",
        newArchEnabled: true,
        splash: {
            image: "./assets/images/splash-icon.png",
            resizeMode: "contain",
            backgroundColor: "#ffffff"
        },
        ios: {
            supportsTablet: true
        },
        android: {
            adaptiveIcon: {
                foregroundImage: "./assets/images/adaptive-icon.png",
                backgroundColor: "#ffffff"
            },
            edgeToEdgeEnabled: true
        },
        web: {
            favicon: "./assets/images/favicon.png"
        },
        updates: {
            url: process.env.UPDATES_URL,
        },
        runtimeVersion: {
            policy: "appVersion"
        },
        extra: {
            URL: process.env.API_URL,
            eas: {
                projectId: process.env.EXPO_PROJECT_ID,
            }
        },
        hooks: {
            postPublish: [
                {
                    file: "sentry-expo/upload-sourcemaps",
                    config: {
                        organization: "Team-One",
                        project: "Community-Connectivity-Orlando",
                    },
                },
            ],
        },
        plugins: [
            [
                "expo-build-properties",
                {
                    ios: {
                        enableProguardInReleaseBuilds: true,
                    },
                    android: {
                        enableProguardInReleaseBuilds: true,
                    },
                },
            ],
        ]
    }
};