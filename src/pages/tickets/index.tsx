import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { TicketStats } from "./components/TicketStats";
import { TicketFilters } from "./components/TicketFilters";
import { TicketList } from "./components/TicketList";
import { CreateTicketDialog } from "./components/CreateTicketDialog";
import { useNavigate } from "react-router-dom";

const Tickets = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<any[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  // Stats
  const [stats, setStats] = useState({
    totalOpen: 0,
    overdue: 0,
    resolved: 0,
    avgResponseTime: "N/A",
  });

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('tickets')
        .select(`
          *,
          profiles:assigned_to(full_name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setTickets(data || []);
      calculateStats(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching tickets",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (ticketData: any[]) => {
    const now = new Date();
    const totalOpen = ticketData.filter(t => t.status === 'Open' || t.status === 'In Progress').length;
    const overdue = ticketData.filter(t => t.due_date && new Date(t.due_date) < now && t.status !== 'Closed').length;
    const resolved = ticketData.filter(t => t.status === 'Resolved' || t.status === 'Closed').length;

    setStats({
      totalOpen,
      overdue,
      resolved,
      avgResponseTime: "2.5h", // Placeholder - would need comment data to calculate
    });
  };

  useEffect(() => {
    fetchTickets();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('tickets-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tickets'
        },
        () => {
          fetchTickets();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    let filtered = [...tickets];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(ticket =>
        ticket.ticket_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.customer_email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(ticket => ticket.status === statusFilter);
    }

    // Apply priority filter
    if (priorityFilter !== "all") {
      filtered = filtered.filter(ticket => ticket.priority === priorityFilter);
    }

    setFilteredTickets(filtered);
  }, [tickets, searchQuery, statusFilter, priorityFilter]);

  const handleViewTicket = (ticketId: string) => {
    // For now, show a toast - will implement detail view in next phase
    toast({
      title: "Ticket Detail View",
      description: "Ticket detail view will be implemented in the next update.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-foreground">Ticket Management</h1>
              <p className="text-lg text-muted-foreground">
                Track and resolve support tickets efficiently
              </p>
            </div>
            <CreateTicketDialog onTicketCreated={fetchTickets} />
          </div>

          <TicketStats
            totalOpen={stats.totalOpen}
            overdue={stats.overdue}
            resolved={stats.resolved}
            avgResponseTime={stats.avgResponseTime}
          />

          <Card>
            <CardHeader>
              <CardTitle>All Tickets</CardTitle>
              <CardDescription>
                Manage and track all support tickets in one place
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <TicketFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
                priorityFilter={priorityFilter}
                onPriorityChange={setPriorityFilter}
              />

              {loading ? (
                <div className="flex items-center justify-center h-64 text-muted-foreground">
                  Loading tickets...
                </div>
              ) : (
                <TicketList tickets={filteredTickets} onViewTicket={handleViewTicket} />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Tickets;