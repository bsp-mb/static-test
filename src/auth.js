const msalConfig = {
    auth: {
        clientId: "f23dfaac-e0dd-41a0-8699-a2920ce9af62", // Deine Client-ID hier
        authority: "https://login.microsoftonline.com/aff61b03-9744-4506-9a7c-473f88d004cf", // Deine Tenant-ID hier
        redirectUri: "https://purple-ground-087907003.4.azurestaticapps.net", // Deine Redirect-URI hier
    },
    cache: {
        cacheLocation: "localStorage", // Speicherort für Session-Informationen
        storeAuthStateInCookie: true, // Um Caching-Probleme zu verhindern
    },
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

async function login() {
    const loginRequest = {
        scopes: ["User.Read"], // Scopes, die du anforderst
    };

    try {
        const loginResponse = await msalInstance.loginPopup(loginRequest);
        console.log("Login erfolgreich: ", loginResponse);
    } catch (error) {
        console.error("Fehler bei der Anmeldung: ", error);
    }
}

async function getToken() {
    const tokenRequest = {
        scopes: ["User.Read"], // Scopes für das Token
    };

    try {
        const response = await msalInstance.acquireTokenSilent(tokenRequest);
        console.log("Token: ", response.accessToken);
    } catch (error) {
        console.error("Fehler beim Abrufen des Tokens: ", error);
        // Falls fehlerhaft, Login erneut durchführen
        login();
    }
}  