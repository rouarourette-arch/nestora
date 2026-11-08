import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Plus,
  CheckCircle2,
  AlertCircle,
  Trash2,
  DollarSign,
  Receipt,
  Sparkles,
  Layers,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Input, Select } from '../../components/ui/Input';
import { Tabs } from '../../components/ui/Tabs';
import { useData } from '../../contexts/DataContext';
import { ShoppingItem } from '../../types';

export const LivingShoppingPage: React.FC = () => {
  const { shoppingList, addShoppingItem, toggleShoppingItem, deleteShoppingItem, activeWorkspace } = useData();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ShoppingItem['category']>('Pantry');
  const [quantity, setQuantity] = useState('1 pack');
  const [urgent, setUrgent] = useState(false);
  const [estimatedCost, setEstimatedCost] = useState('');

  const filteredItems = shoppingList.filter((item) => {
    return selectedCategory === 'ALL' || item.category === selectedCategory;
  });

  const pendingItems = filteredItems.filter((i) => !i.purchased);
  const purchasedItems = filteredItems.filter((i) => i.purchased);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    addShoppingItem({
      name,
      category,
      quantity,
      urgent,
      estimatedCost: parseFloat(estimatedCost) || undefined,
    });
    setIsModalOpen(false);
    setName('');
    setQuantity('1 pack');
    setUrgent(false);
    setEstimatedCost('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#202B25] dark:text-[#F1F4F0]">
            Shared Shopping Lists & Pantry Restocking
          </h1>
          <p className="text-sm text-[#78847C] dark:text-[#B1BDB4] mt-0.5">
            Coordinate communal groceries, supplies, and household restocking for {activeWorkspace.name}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            icon={<Receipt className="w-4 h-4" />}
            onClick={() => navigate('/living/expenses')}
          >
            Split Expense
          </Button>
          <Button
            variant="primary"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setIsModalOpen(true)}
          >
            Add Item
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <Tabs
        activeTab={selectedCategory}
        onChange={setSelectedCategory}
        tabs={[
          { id: 'ALL', label: 'All Items', count: shoppingList.length },
          { id: 'Pantry', label: 'Pantry' },
          { id: 'Cleaning', label: 'Cleaning' },
          { id: 'Produce', label: 'Produce' },
          { id: 'Household', label: 'Household' },
          { id: 'Beverages', label: 'Beverages' },
        ]}
      />

      {/* Shopping List Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* To Buy (Pending) */}
        <Card padding="none" className="overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-[#E3EAE4] dark:border-[#354A3D] flex items-center justify-between bg-[#F3F5F2]/50 dark:bg-[#1D2A23]/50">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-[#234B3A] dark:text-[#8FAF9A]" />
              <h2 className="text-base font-bold text-[#202B25] dark:text-[#F1F4F0]">
                Needed for Pantry ({pendingItems.length})
              </h2>
            </div>
            <span className="text-xs text-[#78847C] dark:text-[#B1BDB4]">
              Pending Purchase
            </span>
          </div>

          <div className="divide-y divide-[#E3EAE4] dark:divide-[#354A3D]">
            {pendingItems.length === 0 ? (
              <div className="p-8 text-center text-xs text-[#78847C] dark:text-[#B1BDB4]">
                The pantry is well stocked! No pending items in this category.
              </div>
            ) : (
              pendingItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 flex items-center justify-between gap-3 hover:bg-black/[0.01] dark:hover:bg-white/[0.01] transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <input
                      type="checkbox"
                      checked={item.purchased}
                      onChange={() => toggleShoppingItem(item.id)}
                      className="w-5 h-5 text-[#234B3A] rounded border-[#E3EAE4] focus:ring-[#234B3A] cursor-pointer"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-sm text-[#202B25] dark:text-[#F1F4F0] truncate">
                          {item.name}
                        </p>
                        {item.urgent && (
                          <Badge variant="danger" size="sm">
                            Urgent
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-[#78847C] dark:text-[#B1BDB4] mt-0.5">
                        Qty: <span className="font-medium text-[#202B25] dark:text-[#F1F4F0]">{item.quantity}</span> • Added by {item.addedByName}
                        {item.estimatedCost && ` • ~$${item.estimatedCost.toFixed(2)}`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant="neutral" size="sm">
                      {item.category}
                    </Badge>
                    <button
                      onClick={() => deleteShoppingItem(item.id)}
                      className="text-[#78847C] hover:text-red-600 p-1 rounded-lg"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Recently Purchased */}
        <Card padding="none" className="overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-[#E3EAE4] dark:border-[#354A3D] flex items-center justify-between bg-[#F3F5F2]/50 dark:bg-[#1D2A23]/50">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-base font-bold text-[#202B25] dark:text-[#F1F4F0]">
                Recently Purchased & Restocked ({purchasedItems.length})
              </h2>
            </div>
            <span className="text-xs text-[#78847C] dark:text-[#B1BDB4]">
              In Stock
            </span>
          </div>

          <div className="divide-y divide-[#E3EAE4] dark:divide-[#354A3D]">
            {purchasedItems.length === 0 ? (
              <div className="p-8 text-center text-xs text-[#78847C] dark:text-[#B1BDB4]">
                No recently bought items. Check off items on the left when purchased!
              </div>
            ) : (
              purchasedItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 flex items-center justify-between gap-3 opacity-75 hover:opacity-100 transition-opacity"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <input
                      type="checkbox"
                      checked={item.purchased}
                      onChange={() => toggleShoppingItem(item.id)}
                      className="w-5 h-5 text-emerald-600 rounded border-[#E3EAE4] cursor-pointer"
                    />
                    <div className="min-w-0">
                      <p className="font-semibold text-sm line-through text-[#78847C] dark:text-[#B1BDB4] truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-[#78847C] dark:text-[#B1BDB4]">
                        {item.quantity} • Restocked
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteShoppingItem(item.id)}
                    className="text-[#78847C] hover:text-red-600 p-1 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      {/* Add Item Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Pantry or Grocery Item"
        description="Notify roommates of items needed for communal stock"
      >
        <form onSubmit={handleAdd} className="space-y-4">
          <Input
            label="Item Description"
            placeholder="e.g. Sriracha Hot Chili Sauce (28oz)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
            >
              <option value="Pantry">Pantry</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Produce">Produce</option>
              <option value="Household">Household</option>
              <option value="Beverages">Beverages</option>
            </Select>

            <Input
              label="Quantity / Pack Size"
              placeholder="e.g. 2 bottles"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <Input
            label="Estimated Cost ($ Optional)"
            type="number"
            step="0.01"
            placeholder="e.g. 6.50"
            value={estimatedCost}
            onChange={(e) => setEstimatedCost(e.target.value)}
          />

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="urgent-check"
              checked={urgent}
              onChange={(e) => setUrgent(e.target.checked)}
              className="w-4 h-4 text-red-600 rounded border-[#E3EAE4] focus:ring-red-500"
            />
            <label htmlFor="urgent-check" className="text-xs font-semibold text-[#202B25] dark:text-[#F1F4F0]">
              Mark as Urgent (Depleted supply)
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Add to List
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
