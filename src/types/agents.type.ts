export type AgentResponseType = {
    id: string; // UUID
    name: string;
    user_id: string; // UUID
    agent_type: string;
    agent_status: string;
    auth_key: string;
    platform: string;
    tags: string[];
    data_processed: number;
    last_activity_at: string;
    created_at: string;
    updated_at: string;
    collection_interval: number;
    last_ip_address?: string;
}

export type AgentRequestType = {
    name: string;
    agent_type: string;
    agent_status: string;
    platform: string;
    collection_interval: number;
    tags: string[];
}
