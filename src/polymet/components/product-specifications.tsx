import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export interface ProductSpecification {
  name: string;
  value: string;
}

export interface ProductSpecificationsProps {
  specifications: ProductSpecification[];
}

export default function ProductSpecifications({
  specifications,
}: ProductSpecificationsProps) {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableBody>
          {specifications.map((spec, index) => (
            <TableRow
              key={spec.name}
              className={index % 2 === 0 ? "bg-muted/50" : ""}
            >
              <TableCell className="font-medium">{spec.name}</TableCell>
              <TableCell>{spec.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
