import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Ticket {
  id: string;
  ticket_number: string;
  title: string;
  customer_name: string;
  priority: string;
  status: string;
  created_at: string;
  assigned_to?: string;
  profiles?: {
    full_name: string;
  };
}

interface TicketListProps {
  tickets: Ticket[];
  onViewTicket: (ticketId: string) => void;
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'Critical': return 'bg-destructive text-destructive-foreground';
    case 'High': return 'bg-orange-500 text-white';
    case 'Medium': return 'bg-yellow-500 text-white';
    case 'Low': return 'bg-blue-500 text-white';
    default: return 'bg-secondary text-secondary-foreground';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Open': return 'bg-blue-500 text-white';
    case 'In Progress': return 'bg-yellow-500 text-white';
    case 'Pending': return 'bg-gray-500 text-white';
    case 'Resolved': return 'bg-green-500 text-white';
    case 'Closed': return 'bg-gray-500 text-white';
    default: return 'bg-secondary text-secondary-foreground';
  }
};

export const TicketList = ({ tickets, onViewTicket }: TicketListProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ticket #</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center text-muted-foreground">
                No tickets found
              </TableCell>
            </TableRow>
          ) : (
            tickets.map((ticket) => (
              <TableRow key={ticket.id} className="cursor-pointer hover:bg-muted/50">
                <TableCell className="font-mono text-sm">{ticket.ticket_number}</TableCell>
                <TableCell className="font-medium max-w-xs truncate">{ticket.title}</TableCell>
                <TableCell>{ticket.customer_name}</TableCell>
                <TableCell>
                  <Badge className={getPriorityColor(ticket.priority)}>
                    {ticket.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(ticket.status)}>
                    {ticket.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {ticket.assigned_to ? (
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">
                          {ticket.profiles?.full_name?.split(' ').map(n => n[0]).join('') || 'NA'}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{ticket.profiles?.full_name || 'Unknown'}</span>
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">Unassigned</span>
                  )}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(ticket.created_at), { addSuffix: true })}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewTicket(ticket.id)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};