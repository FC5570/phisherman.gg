import phin from 'phin';

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

	public async check(domain: string): Promise<PhishermanCheckResponse> {
		try {
			const { body } = await phin({
				url: `https://api.phisherman.gg/v2/domains/check/${domain}`,
				parse: 'json',
				headers: {
					Authorization: `Bearer ${this.apiKey}`,
					'Content-Type': 'application/json'
				}
			});
			return body as PhishermanCheckResponse;
		} catch (err) {
			throw new Error(`PhishermanClient[check]: ${err}`);
		}
	}

	public async report(domain: string): Promise<PhishermanReportResponse> {
		try {
			const { body } = await phin({
				method: 'PUT',
				url: `https://api.phisherman.gg/v2/phish/report`,
				parse: 'json',
				headers: {
					Authorization: `Bearer ${this.apiKey}`,
					'Content-Type': 'application/json'
				},
				data: {
					url: domain
				}
			});
			return body as PhishermanReportResponse;
		} catch (err) {
			throw new Error(`PhishermanClient[report]: ${err}`);
		}
	}
}

export interface PhishermanCheckResponse {
	classification: 'safe' | 'suspicious' | 'malicious';
	verifiedPhish: boolean;
}

export interface PhishermanReportResponse {
	success: boolean;
	message: string;
}
