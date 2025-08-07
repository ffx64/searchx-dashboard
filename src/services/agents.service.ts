import api from "@/lib/api";
import { AgentRequestType, AgentResponseType } from "@/types/agents.type";
import { ExceptionResponseType } from "@/types/exception.type";
import { Agent } from "http";
import { toast } from "sonner";

export class AgentsService {
    private url = "http://localhost:8080/api/v1/agents";

    async getAll(): Promise<AgentResponseType[]> {
        try {
            const response = await api.get(this.url);

            if (!Array.isArray(response.data) || response.data.length === 0) {
                return [];
            }

            return response.data;
        } catch (error: any) {
            const errData = error?.response?.data as ExceptionResponseType | undefined;

            if (errData?.message) {
                toast.error(errData.message);
                console.error("API error:", errData);
            } else {
                toast.error("Failed to load agents.");
                console.error("Unknown error:", error);
            }

            return [];
        }
    }

    async create(data: AgentRequestType): Promise<AgentResponseType | null> {
        try {
            const response = await api.post<AgentResponseType>(this.url, data)

            return response.data
        } catch (error: any) {
            const errData = error?.response?.data as ExceptionResponseType | undefined

            if (errData?.message) {
                toast.error(errData.message)
                console.error("API error:", errData)
            } else {
                toast.error("Failed to create agent.")
                console.error("Unknown error:", error)
            }

            return null
        }
    }


    async update(id: string, data: AgentRequestType): Promise<any> {
        try {
            const response = await api.put(`${this.url}/${id}`, data);
            return response.data;
        } catch (error: any) {
            const errData = error?.response?.data as ExceptionResponseType | undefined;

            if (errData?.message) {
                toast.error(errData.message);
                console.error("API error:", errData);
            } else {
                toast.error("Failed to update agent.");
                console.error("Unknown error:", error);
            }

            return null;
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await api.delete(`${this.url}/${id}`);
        } catch (error: any) {
            const errData = error?.response?.data as ExceptionResponseType | undefined;

            if (errData?.message) {
                toast.error(errData.message);
                console.error("API error:", errData);
            } else {
                toast.error("Failed to delete agent.");
                console.error("Unknown error:", error);
            }
        }
    }
}