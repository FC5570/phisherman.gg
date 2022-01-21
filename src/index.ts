import phin, { IJSONResponseOptions, IWithData } from 'phin';

export interface PhishermanClientOptions {
	apiKey: string;
}

export class PhishermanClient {
	public apiKey: string;

	public constructor(options: PhishermanClientOptions) {
		const { apiKey } = options;
		if (!apiKey || typeof apiKey !== 'string') throw new Error('PhishermanClient: apiKey is required and must be typeof string.');

		this.apiKey = apiKey;
	}

	/**
	 * Checks the supplied domain against the phisherman database. Returns the classification and status (verified) of the domain, if valid.
	 */
	public async check(domain: string): Promise<PhishermanCheckResponse> {
		return this.makeRequest(`https://api.phisherman.gg/v2/domains/check/${domain}`) as Promise<PhishermanCheckResponse>;
	}

	/**
	 * Returns information the phisherman database has stored about a phishing domain.
	 */
	public async info(domain: string): Promise<PhishermanInfo> {
		const data = (await this.makeRequest(`https://api.phisherman.gg/v2/domains/info/${domain}`)) as PhishermanInfoResponse;
		return data[domain];
	}

	/**
	 * When integrating the Phisherman checks with your Discord bot, you can optionally report back when it catches a phish in your server(s).
	 * Reporting back caught phish is entirely optional and not required for normal usage, it is to help the phisherman API with analytics
	 */
	public async reportCaughPhish(domain: string, guildId?: string) {
		return this.makeRequest(undefined, {
			url: `https://api.phisherman.gg/v2/phish/caught/${domain}`,
			method: 'POST',
			parse: 'json',
			data: {
				guild: guildId
			}
		});
	}

	/**
	 * Report a new phishing domain to the phisherman API.
	 */
	public async reportNewPhish(domain: string): Promise<PhishermanReportResponse> {
		const body = await this.makeRequest(undefined, {
			url: 'https://api.phisherman.gg/v2/phish/report',
			method: 'PUT',
			parse: 'json',
			data: {
				url: domain
			}
		});
		return body as PhishermanReportResponse;
	}

	private async makeRequest(url?: string, options?: IJSONResponseOptions | IWithData<IJSONResponseOptions>) {
		try {
			const { body } = await phin({
				...options,
				url: (url ?? options?.url)!,
				method: options?.method ?? 'GET',
				parse: 'json',
				headers: {
					Authorization: `Bearer ${this.apiKey}`,
					'Content-Type': 'application/json'
				}
			});
			return body;
		} catch (err) {
			throw new Error(`PhishermanClient: ${err}`);
		}
	}
}

export interface PhishermanCheckResponse {
	classification: PhishermanClassification;
	verifiedPhish: boolean;
}

export interface PhishermanReportResponse {
	success: boolean;
	message: string;
}

export interface PhishermanInfoResponse {
	[T: string]: PhishermanInfo;
}
export interface PhishermanInfo {
	status: string;
	created: string;
	lastChecked: string;
	verifiedPhish: boolean;
	classification: PhishermanClassification;
	firstSeen: string;
	lastSeen: string;
	targetedBrand: string;
	phishCaught: number;
	details: PhishermanInfoResponseDetails;
}

export interface PhishermanInfoResponseDetails {
	phishTankId: string;
	urlScanId: string;
	websiteScreenshot: string;
	ip_address: string;
	asn: PhishermanInfoResponseDetailsAsn;
	registry: string;
	country: {
		code: string;
		name: string;
	};
}

export interface PhishermanInfoResponseDetailsAsn {
	asn: string;
	asn_name: string;
	route: string;
}

export type PhishermanClassification = 'safe' | 'suspicious' | 'malicious';
