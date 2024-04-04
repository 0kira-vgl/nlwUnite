import { ChangeEvent, useState } from "react";
import {
  Search,
  MoreHorizontal,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";
import { IconButton } from "../IconButton";
import { Table } from "../Table/table";
import { TableHeader } from "../Table/tableHeader";
import { TableCell } from "../Table/tableCell";
import { TableRow } from "../Table/tableRow";
import { attendees } from "../../data/attendees";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

export function AttendeeList() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(attendees.length / 10);

  function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
    setPage(1);
  }

  function goToNextPage() {
    setPage(page + 1);
  }

  function goToPreviousPage() {
    setPage(page - 1);
  }

  function goToFirstPage() {
    setPage(1);
  }

  function goToLastPage() {
    setPage(totalPages);
  }

  const filteredAttendees = attendees.filter(
    (attendee) =>
      attendee.name.toLowerCase().includes(search.toLowerCase()) ||
      attendee.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <div className="px-3 w-72 py-1.5 border border-white/10 rounded-lg flex items-center gap-3">
          <Search className="size-4 text-emerald-300" />
          <input
            onChange={onSearchInputChanged}
            type="search"
            placeholder="Buscar participante..."
            className="bg-transparent flex-1 outline-none border-0 p-0 text-sm focus:ring-0"
          />
        </div>
      </div>

      <Table className="border border-white/10 rounded-lg">
        <thead>
          <tr className="border-b border-white/10">
            <TableHeader
              style={{ width: 48 }}
              className="py-3 px-4 text-sm font-semibold text-left"
            >
              <input
                type="checkbox"
                className="size-4 bg-black/20 rounded border border-white/10"
              />
            </TableHeader>
            <TableHeader>Código</TableHeader>
            <TableHeader>Participante</TableHeader>
            <TableHeader>Data da inscrição</TableHeader>
            <TableHeader>Data do check-in</TableHeader>
            <TableHeader style={{ width: 64 }}></TableHeader>
          </tr>
        </thead>
        <tbody>
          {filteredAttendees
            .slice((page - 1) * 10, page * 10)
            .map((attendee) => {
              return (
                <TableRow key={attendee.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      className="size-4 bg-black/20 rounded border border-white/10"
                    />
                  </TableCell>
                  <TableCell>{attendee.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-white">
                        {attendee.name}
                      </span>
                      <span>{attendee.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>{dayjs().to(attendee.createdAt)}</TableCell>
                  <TableCell>{dayjs().to(attendee.chekedInAt)}</TableCell>
                  <TableCell>
                    <IconButton transparent={true}>
                      <MoreHorizontal className="size-4" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
        </tbody>
        <tfoot>
          <tr>
            <TableCell colSpan={3}>
              Mostrando 10 de {filteredAttendees.length} itens
            </TableCell>
            <TableCell className="text-right" colSpan={3}>
              <div className="inline-flex items-center gap-8">
                <span>
                  Página {page} de {totalPages}
                </span>

                <div className="flex gap-1.5">
                  <IconButton onClick={goToFirstPage} disabled={page === 1}>
                    <ChevronsLeft className="size-4" />
                  </IconButton>
                  <IconButton onClick={goToPreviousPage} disabled={page === 1}>
                    <ChevronLeft className="size-4" />
                  </IconButton>
                  <IconButton
                    onClick={goToNextPage}
                    disabled={page === totalPages}
                  >
                    <ChevronRight className="size-4" />
                  </IconButton>
                  <IconButton
                    onClick={goToLastPage}
                    disabled={page === totalPages}
                  >
                    <ChevronsRight className="size-4" />
                  </IconButton>
                </div>
              </div>
            </TableCell>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
}
